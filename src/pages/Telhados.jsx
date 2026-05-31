import React, { useMemo, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    Typography,
    IconButton,
    Breadcrumbs,
    Link
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useLeituras, useEstatisticasLeituras, useMediaMovel, useAmplitudeTermica, useTaxaDesidratacao } from '../hooks/useLeituras';
import { useDispositivos } from '../hooks/useDispositivos';
import TabelaHistorico from '../components/TabelaHistorico';

const GraficoEvolucao = lazy(() => import('../components/GraficoEvolucao'));
const GraficoComparativo = lazy(() => import('../components/GraficoComparativo'));
const GraficoMediaMovel = lazy(() => import('../components/GraficoMediaMovel'));
const GraficoAmplitudeTermica = lazy(() => import('../components/GraficoAmplitudeTermica'));
const GraficoTaxaDesidratacao = lazy(() => import('../components/GraficoTaxaDesidratacao'));

const BentoCard = ({ children, sx = {} }) => (
    <Card
        elevation={0}
        sx={{
            height: '100%',
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            backdropFilter: 'blur(10px)',
            ...sx
        }}
    >
        <CardContent sx={{ height: '100%' }}>
            {children}
        </CardContent>
    </Card>
);

export default function Telhados() {
    const { id } = useParams();
    const navigate = useNavigate();
    const idDispositivo = parseInt(id);

    // Date range for aggregations (last 7 days)
    const { dataInicio, dataFim } = useMemo(() => {
        const fim = new Date();
        const inicio = new Date();
        inicio.setDate(fim.getDate() - 7);
        return {
            dataFim: fim.toISOString().split('T')[0],
            dataInicio: inicio.toISOString().split('T')[0]
        };
    }, []);

    const { data: dispositivos = [] } = useDispositivos();
    const telhadoAtual = dispositivos.find(d => d.id === idDispositivo);

    const { data: leiturasTempRaw } = useLeituras({ tipo: 'temperatura', limit: 500, id_dispositivo: idDispositivo });
    const { data: leiturasUmidRaw } = useLeituras({ tipo: 'umidade', limit: 500, id_dispositivo: idDispositivo });

    // Filter by dispositivo (API now handles this, but we keep the memo for format safety)
    const leiturasTemp = useMemo(() => {
        return Array.isArray(leiturasTempRaw?.dados) ? leiturasTempRaw.dados : [];
    }, [leiturasTempRaw]);

    const leiturasUmid = useMemo(() => {
        return Array.isArray(leiturasUmidRaw?.dados) ? leiturasUmidRaw.dados : [];
    }, [leiturasUmidRaw]);

    const { data: statsTemp = [] } = useEstatisticasLeituras({ tipo: 'temperatura', id_dispositivo: idDispositivo });
    const { data: statsUmid = [] } = useEstatisticasLeituras({ tipo: 'umidade', id_dispositivo: idDispositivo });

    // New aggregations
    const { data: mediaMovelTemp = [] } = useMediaMovel({ 
        tipo: 'temperatura', 
        id_dispositivo: idDispositivo,
        data_inicio: dataInicio,
        data_fim: dataFim,
        intervalo_minutos: 30
    });

    const { data: amplitudeTermica = [] } = useAmplitudeTermica({
        id_dispositivo: idDispositivo,
        data_inicio: dataInicio,
        data_fim: dataFim
    });

    const { data: taxaDesidratacao = [] } = useTaxaDesidratacao({
        id_dispositivo: idDispositivo,
        data_inicio: dataInicio,
        data_fim: dataFim
    });

    const metricasGlobais = useMemo(() => {
        const processar = (leituras) => {
            if (!Array.isArray(leituras) || leituras.length === 0) {
                return { media: 0, minimo: 0, maximo: 0, total: 0 };
            }

            const valores = leituras.map(l => l.valor);
            const soma = valores.reduce((a, b) => a + b, 0);
            const total = leituras.length;

            return {
                media: soma / total,
                minimo: Math.min(...valores),
                maximo: Math.max(...valores),
                total
            };
        };

        return {
            temp: processar(leiturasTemp),
            umid: processar(leiturasUmid)
        };
    }, [leiturasTemp, leiturasUmid]);

    const todasLeituras = useMemo(() => {
        return [...leiturasTemp, ...leiturasUmid].sort(
            (a, b) => new Date(b.criado_em) - new Date(a.criado_em)
        );
    }, [leiturasTemp, leiturasUmid]);

    const dadosGraficoLinha = useMemo(() => {
        const mapa = new Map();

        leiturasTemp.forEach(l => {
            if (!mapa.has(l.criado_em)) {
                mapa.set(l.criado_em, { tempo: l.criado_em });
            }

            mapa.get(l.criado_em).temperatura = l.valor;
        });

        leiturasUmid.forEach(l => {
            if (!mapa.has(l.criado_em)) {
                mapa.set(l.criado_em, { tempo: l.criado_em });
            }

            mapa.get(l.criado_em).umidade = l.valor;
        });

        return Array.from(mapa.values())
            .sort((a, b) => new Date(a.tempo) - new Date(b.tempo))
            .map(item => ({
                ...item,
                tempoFormatado: new Date(item.tempo).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            }));
    }, [leiturasTemp, leiturasUmid]);

    return (
        <Box sx={{ pb: 4 }}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton onClick={() => navigate('/telhados')} color="primary">
                    <ArrowBackIcon />
                </IconButton>
                <Box>
                    <Breadcrumbs>
                        <Link underline="hover" color="inherit" href="#" onClick={(e) => { e.preventDefault(); navigate('/telhados'); }}>
                            Telhados
                        </Link>
                        <Typography color="text.primary">
                            {telhadoAtual?.nome || 'Detalhes'}
                        </Typography>
                    </Breadcrumbs>
                </Box>
            </Box>

            {/* Top Summary Row */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        lg: 'repeat(4, 1fr)'
                    },
                    gap: 3,
                    mb: 3
                }}
            >
                <BentoCard>
                    <Typography variant="h3" gutterBottom>
                        Temperatura Média
                    </Typography>
                    <Typography variant="h4">
                        {metricasGlobais.temp.media.toFixed(2)} °C
                    </Typography>
                </BentoCard>

                <BentoCard>
                    <Typography variant="h3" gutterBottom>
                        Umidade Média
                    </Typography>
                    <Typography variant="h4">
                        {metricasGlobais.umid.media.toFixed(2)} %
                    </Typography>
                </BentoCard>

                <BentoCard>
                    <Typography variant="h3" gutterBottom>
                        Extremos Temp
                    </Typography>
                    <Typography>
                        Min: {metricasGlobais.temp.minimo.toFixed(2)} °C
                    </Typography>
                    <Typography>
                        Max: {metricasGlobais.temp.maximo.toFixed(2)} °C
                    </Typography>
                </BentoCard>

                <BentoCard>
                    <Typography variant="h3" gutterBottom>
                        Total Leituras
                    </Typography>
                    <Typography variant="h4">
                        {metricasGlobais.temp.total + metricasGlobais.umid.total}
                    </Typography>
                </BentoCard>
            </Box>

            {/* Main Content: Two Columns */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        lg: '7fr 5fr' // Approx 60/40
                    },
                    gap: 3,
                    alignItems: 'start'
                }}
            >
                {/* Left Column (60%) */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <BentoCard>
                        <Typography variant="h2" gutterBottom>
                            Evolução Temporal (Últimas 500)
                        </Typography>
                        <Box sx={{ height: 400, width: '100%' }}>
                            <Suspense fallback={<div>Carregando gráfico...</div>}>
                                <GraficoEvolucao data={dadosGraficoLinha} />
                            </Suspense>
                        </Box>
                    </BentoCard>

                    <BentoCard>
                        <Box sx={{ height: 400, width: '100%' }}>
                            <Suspense fallback={<div>Carregando média móvel...</div>}>
                                <GraficoMediaMovel 
                                    data={mediaMovelTemp} 
                                    titulo="Média Móvel - Temperatura (7 dias)" 
                                    cor="#ef4444" 
                                />
                            </Suspense>
                        </Box>
                    </BentoCard>

                    <BentoCard>
                        <TabelaHistorico
                            leituras={todasLeituras}
                            dispositivos={dispositivos}
                        />
                    </BentoCard>
                </Box>

                {/* Right Column (40%) */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <BentoCard>
                        <Box sx={{ height: 350, width: '100%' }}>
                            <Suspense fallback={<div>Carregando comparação...</div>}>
                                <GraficoComparativo
                                    data={statsTemp}
                                    titulo="Temperatura por Sensor"
                                    unidade="°C"
                                    corPrincipal="#ef4444"
                                />
                            </Suspense>
                        </Box>
                    </BentoCard>

                    <BentoCard>
                        <Box sx={{ height: 350, width: '100%' }}>
                            <Suspense fallback={<div>Carregando comparação...</div>}>
                                <GraficoComparativo
                                    data={statsUmid}
                                    titulo="Umidade por Sensor"
                                    unidade="%"
                                    corPrincipal="#3b82f6"
                                />
                            </Suspense>
                        </Box>
                    </BentoCard>

                    <BentoCard>
                        <Box sx={{ height: 350, width: '100%' }}>
                            <Suspense fallback={<div>Carregando amplitude...</div>}>
                                <GraficoAmplitudeTermica data={amplitudeTermica} />
                            </Suspense>
                        </Box>
                    </BentoCard>

                    <BentoCard>
                        <Box sx={{ height: 350, width: '100%' }}>
                            <Suspense fallback={<div>Carregando desidratação...</div>}>
                                <GraficoTaxaDesidratacao data={taxaDesidratacao} />
                            </Suspense>
                        </Box>
                    </BentoCard>
                </Box>
            </Box>
        </Box>
    );
}