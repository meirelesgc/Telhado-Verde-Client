import React from 'react';
import { Box, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import { useMonitoramento } from '../hooks/useMonitoramento';
import { SensorChart } from '../components/charts/SensorChart';
import { RecentReadingsTable } from '../components/tables/RecentReadingsTable';
import { DashboardControls } from '../components/dashboard/DashboardControls';

// --- Sub-componentes ---

const DashboardHeader = ({ filtros, setFiltros, onDownload, disableDownload }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
            Monitoramento
        </Typography>
        <DashboardControls
            filtros={filtros}
            setFiltros={setFiltros}
            onDownload={onDownload}
            disableDownload={disableDownload}
        />
    </Box>
);


const SensorSection = ({ title, color, data, unit }) => (
    <Grid item xs={12} sx={{ mb: 4 }}>
        <Grid container spacing={2}>

            <Grid item xs={12}>
                <Typography variant="h5" sx={{ mb: 1, color: color }}>
                    {title}
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <SensorChart
                    title="Evolução Temporal"
                    data={data}
                    color={color}
                    unit={unit}
                />
            </Grid>

            <Grid item xs={12}>
                <RecentReadingsTable data={data} />
            </Grid>

        </Grid>
    </Grid>
);

const DataContent = ({ isLoading, isError, children }) => {
    if (isError) {
        return <Alert severity="error" sx={{ mb: 2 }}>Erro ao carregar dados.</Alert>;
    }

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Grid container>
            {children}
        </Grid>
    );
};


export default function Dashboard() {
    const {
        filtros,
        setFiltros,
        temperaturaData,
        umidadeData,
        isLoading,
        isError,
        handleDownloadCSV
    } = useMonitoramento();

    return (
        <Box>
            <DashboardHeader
                filtros={filtros}
                setFiltros={setFiltros}
                onDownload={handleDownloadCSV}
                disableDownload={isLoading || isError}
            />

            <DataContent isLoading={isLoading} isError={isError}>

                <SensorSection
                    title="Temperatura"
                    color="#ff5722"
                    unit="°C"
                    data={temperaturaData}
                />

                <SensorSection
                    title="Umidade"
                    color="#2196f3"
                    unit="%"
                    data={umidadeData}
                />

            </DataContent>
        </Box>
    );
}