import React, { useMemo, useState, lazy, Suspense } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText
} from '@mui/material';

import { useLeituras, useEstatisticasLeituras } from '../hooks/useLeituras';
import { useDispositivos } from '../hooks/useDispositivos';
import TabelaHistorico from '../components/TabelaHistorico';

const GraficoEvolucao = lazy(() => import('../components/GraficoEvolucao'));
const GraficoComparativo = lazy(() => import('../components/GraficoComparativo'));

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

export default function Metricas() {
    const { data: dispositivos = [] } = useDispositivos();
    const [filtroDispositivo, setFiltroDispositivo] = useState([]);

    const { data: leiturasTempRaw } = useLeituras({ tipo: 'temperatura', limit: 500 });
    const { data: leiturasUmidRaw } = useLeituras({ tipo: 'umidade', limit: 500 });

    const leiturasTemp = Array.isArray(leiturasTempRaw?.dados) ? leiturasTempRaw.dados : [];
    const leiturasUmid = Array.isArray(leiturasUmidRaw?.dados) ? leiturasUmidRaw.dados : [];

    const { data: statsTemp = [] } = useEstatisticasLeituras({ tipo: 'temperatura' });
    const { data: statsUmid = [] } = useEstatisticasLeituras({ tipo: 'umidade' });

    const metricasGlobais = useMemo(() => {
        const processar = (stats) => {
            if (!Array.isArray(stats) || stats.length === 0) {
                return { media: 0, minimo: 0, maximo: 0, total: 0 };
            }

            let somaPonderada = 0;
            let total = 0;
            let minimo = Infinity;
            let maximo = -Infinity;

            stats.forEach(s => {
                somaPonderada += (s.media * s.total_leituras);
                total += s.total_leituras;

                if (s.minimo < minimo) minimo = s.minimo;
                if (s.maximo > maximo) maximo = s.maximo;
            });

            return {
                media: total > 0 ? somaPonderada / total : 0,
                minimo: minimo === Infinity ? 0 : minimo,
                maximo: maximo === -Infinity ? 0 : maximo,
                total
            };
        };

        return {
            temp: processar(statsTemp),
            umid: processar(statsUmid)
        };
    }, [statsTemp, statsUmid]);

    const todasLeituras = useMemo(() => {
        return [...leiturasTemp, ...leiturasUmid].sort(
            (a, b) => new Date(b.criado_em) - new Date(a.criado_em)
        );
    }, [leiturasTemp, leiturasUmid]);

    const leiturasFiltradas = useMemo(() => {
        if (filtroDispositivo.length === 0) return todasLeituras;

        return todasLeituras.filter(
            l => filtroDispositivo.includes(l.id_dispositivo)
        );
    }, [todasLeituras, filtroDispositivo]);

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

    const handleFiltroChange = (event) => {
        const {
            target: { value },
        } = event;
        setFiltroDispositivo(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    lg: 'repeat(12, 1fr)'
                },
                gap: 3,
                pb: 4
            }}
        >
            <BentoCard sx={{ gridColumn: { lg: 'span 3' } }}>
                <Typography variant="h3" gutterBottom>
                    Temperatura Média
                </Typography>

                <Typography variant="h4">
                    {metricasGlobais.temp.media.toFixed(2)} °C
                </Typography>
            </BentoCard>

            <BentoCard sx={{ gridColumn: { lg: 'span 3' } }}>
                <Typography variant="h3" gutterBottom>
                    Umidade Média
                </Typography>

                <Typography variant="h4">
                    {metricasGlobais.umid.media.toFixed(2)} %
                </Typography>
            </BentoCard>

            <BentoCard sx={{ gridColumn: { lg: 'span 3' } }}>
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

            <BentoCard sx={{ gridColumn: { lg: 'span 3' } }}>
                <Typography variant="h3" gutterBottom>
                    Total Leituras
                </Typography>

                <Typography variant="h4">
                    {metricasGlobais.temp.total + metricasGlobais.umid.total}
                </Typography>
            </BentoCard>

            <BentoCard
                sx={{
                    gridColumn: { lg: 'span 12' }
                }}
            >
                <Typography variant="h2" gutterBottom>
                    Filtro
                </Typography>

                <FormControl fullWidth>
                    <InputLabel>Dispositivos</InputLabel>

                    <Select
                        multiple
                        value={filtroDispositivo}
                        label="Dispositivos"
                        onChange={handleFiltroChange}
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return 'Todos';
                            }
                            return dispositivos
                                .filter(d => selected.includes(d.id))
                                .map(d => d.nome)
                                .join(', ');
                        }}
                    >
                        {dispositivos.map(d => (
                            <MenuItem key={d.id} value={d.id}>
                                <Checkbox checked={filtroDispositivo.includes(d.id)} />
                                <ListItemText primary={d.nome} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </BentoCard>

            <BentoCard
                sx={{
                    gridColumn: { lg: 'span 12' },
                    minHeight: 420
                }}
            >
                <Typography variant="h2" gutterBottom>
                    Evolução Temporal
                </Typography>

                <Suspense fallback={<div>Carregando gráfico...</div>}>
                    <GraficoEvolucao data={dadosGraficoLinha} />
                </Suspense>
            </BentoCard>

            <BentoCard
                sx={{
                    gridColumn: { lg: 'span 6' },
                    minHeight: 360
                }}
            >
                <Suspense fallback={<div>Carregando comparação...</div>}>
                    <GraficoComparativo
                        data={statsTemp}
                        titulo="Temperatura por Sensor"
                        unidade="°C"
                        corPrincipal="#ef4444"
                    />
                </Suspense>
            </BentoCard>

            <BentoCard
                sx={{
                    gridColumn: { lg: 'span 6' },
                    minHeight: 360
                }}
            >
                <Suspense fallback={<div>Carregando comparação...</div>}>
                    <GraficoComparativo
                        data={statsUmid}
                        titulo="Umidade por Sensor"
                        unidade="%"
                        corPrincipal="#3b82f6"
                    />
                </Suspense>
            </BentoCard>

            <BentoCard
                sx={{
                    gridColumn: { lg: 'span 12' }
                }}
            >
                <Typography variant="h2" gutterBottom>
                    Histórico de Leituras
                </Typography>

                <TabelaHistorico
                    leituras={leiturasFiltradas}
                    dispositivos={dispositivos}
                />
            </BentoCard>
        </Box>
    );
}