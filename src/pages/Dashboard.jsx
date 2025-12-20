import React, { useState } from 'react';
import {
    Typography, Grid, Paper, TextField, Button, Box,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    CircularProgress, Alert
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DownloadIcon from '@mui/icons-material/Download';

import { useLeituras } from '../hooks/useLeituras';
import { downloadCSV } from '../utils/exportCsv';

export default function Dashboard() {
    // Estado local para filtros
    const [filtros, setFiltros] = useState({
        idDispositivo: 1, // Exemplo fixo, poderia vir de um select
        dataInicio: new Date().toISOString().split('T')[0], // Hoje (YYYY-MM-DD)
        dataFim: new Date().toISOString().split('T')[0]
    });

    // Buscando dados usando nosso Hook customizado
    // React Query dispara duas requisições paralelas
    const tempQuery = useLeituras('temperatura', filtros);
    const umidQuery = useLeituras('umidade', filtros);

    const isLoading = tempQuery.isLoading || umidQuery.isLoading;
    const isError = tempQuery.isError || umidQuery.isError;

    const handleDownload = () => {
        // Baixa o que estiver carregado
        const dadosParaBaixar = [
            ...(tempQuery.data || []).map(d => ({ ...d, tipo: 'temperatura' })),
            ...(umidQuery.data || []).map(d => ({ ...d, tipo: 'umidade' }))
        ];
        downloadCSV(dadosParaBaixar, `relatorio_${filtros.dataInicio}.csv`);
    };

    // Função para formatar data no eixo X do gráfico
    const formatXAxis = (tickItem) => {
        // Supondo que a API retorna "2023-10-25T10:00:00"
        const date = new Date(tickItem);
        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">Monitoramento Ambiental</Typography>

                {/* Controles de Filtro */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        label="Data Início"
                        type="date"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        value={filtros.dataInicio}
                        onChange={(e) => setFiltros(prev => ({ ...prev, dataInicio: e.target.value }))}
                    />
                    <TextField
                        label="Data Fim"
                        type="date"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        value={filtros.dataFim}
                        onChange={(e) => setFiltros(prev => ({ ...prev, dataFim: e.target.value }))}
                    />
                    <Button
                        variant="contained"
                        startIcon={<DownloadIcon />}
                        onClick={handleDownload}
                        disabled={isLoading || isError}
                    >
                        CSV
                    </Button>
                </Box>
            </Box>

            {isError && <Alert severity="error" sx={{ mb: 2 }}>Erro ao carregar dados da API.</Alert>}
            {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>}

            {!isLoading && !isError && (
                <Grid container spacing={3}>
                    {/* Gráfico Temperatura */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2, height: 350 }}>
                            <Typography variant="h6" gutterBottom>Temperatura (°C)</Typography>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={tempQuery.data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="criado_em" tickFormatter={formatXAxis} />
                                    <YAxis domain={['auto', 'auto']} />
                                    <Tooltip labelFormatter={(label) => new Date(label).toLocaleString()} />
                                    <Line type="monotone" dataKey="valor" stroke="#ff5722" dot={false} strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>

                    {/* Gráfico Umidade */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2, height: 350 }}>
                            <Typography variant="h6" gutterBottom>Umidade (%)</Typography>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={umidQuery.data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="criado_em" tickFormatter={formatXAxis} />
                                    <YAxis domain={[0, 100]} />
                                    <Tooltip labelFormatter={(label) => new Date(label).toLocaleString()} />
                                    <Line type="monotone" dataKey="valor" stroke="#2196f3" dot={false} strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>

                    {/* Tabela de Dados Brutos */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>Últimas Leituras (Bruto)</Typography>
                            <TableContainer sx={{ maxHeight: 400 }}>
                                <Table stickyHeader size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Data/Hora</TableCell>
                                            <TableCell>Sensor ID</TableCell>
                                            <TableCell>Tipo</TableCell>
                                            <TableCell align="right">Valor</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* Exemplo: misturando e ordenando os dois arrays, idealmente o backend faria isso */}
                                        {[...(tempQuery.data || []).map(i => ({ ...i, tipo: 'Temp' })),
                                        ...(umidQuery.data || []).map(i => ({ ...i, tipo: 'Umid' }))]
                                            .sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em)) // Mais recente primeiro
                                            .slice(0, 50) // Mostra apenas os ultimos 50 para nao travar o DOM na tabela
                                            .map((row) => (
                                                <TableRow key={`${row.tipo}-${row.id_leitura}`}>
                                                    <TableCell>{new Date(row.criado_em).toLocaleString()}</TableCell>
                                                    <TableCell>{row.id_sensor}</TableCell>
                                                    <TableCell>{row.tipo}</TableCell>
                                                    <TableCell align="right">{row.valor}</TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
}