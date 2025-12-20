import React from 'react';
import { Box, Typography, Grid, CircularProgress, Alert } from '@mui/material';

// Imports dos novos módulos
import { useMonitoramento } from '../hooks/useMonitoramento';
import { SensorChart } from '../components/charts/SensorChart';
import { RecentReadingsTable } from '../components/tables/RecentReadingsTable';
import { DashboardControls } from '../components/dashboard/DashboardControls';

export default function Dashboard() {
    // Toda a lógica complexa foi movida para este hook
    const {
        filtros,
        setFiltros,
        temperaturaData,
        umidadeData,
        tabelaData,
        isLoading,
        isError,
        handleDownloadCSV
    } = useMonitoramento();

    return (
        <Box>
            {/* Cabeçalho e Controles */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">Monitoramento Ambiental</Typography>
                <DashboardControls
                    filtros={filtros}
                    setFiltros={setFiltros}
                    onDownload={handleDownloadCSV}
                    disableDownload={isLoading || isError}
                />
            </Box>

            {/* Feedback Visual */}
            {isError && <Alert severity="error" sx={{ mb: 2 }}>Erro ao carregar dados.</Alert>}

            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {/* Gráficos Reutilizáveis */}
                    <Grid item xs={12} md={6}>
                        <SensorChart
                            title="Temperatura"
                            data={temperaturaData}
                            color="#ff5722"
                            unit="°C"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SensorChart
                            title="Umidade"
                            data={umidadeData}
                            color="#2196f3"
                            unit="%"
                        />
                    </Grid>

                    {/* Tabela Isolada */}
                    <Grid item xs={12}>
                        <RecentReadingsTable data={tabelaData} />
                    </Grid>
                </Grid>
            )}
        </Box>
    );
}