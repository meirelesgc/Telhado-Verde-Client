import React, { useState } from 'react';
import { Box, CircularProgress, Alert, Card, Stack, Typography, Divider, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';

// Hooks e Utils
import { useDispositivos, useLeiturasTemperatura, useLeiturasUmidade, useSensores } from '../hooks/useTelhadoVerde';
import { downloadCSV } from '../utils/exportUtils';

// Componentes Extraídos (Você deve importar os que criamos acima)
import { SummaryCards } from './DashboardComponents/SummaryCards';
import { DataVisualizer } from './DashboardComponents/DataVisualizer'; // Sugestão de novo componente
import { DeviceStatusList } from './DashboardComponents/DeviceStatusList'; // Sugestão de novo componente

// Ícones
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import MemoryIcon from '@mui/icons-material/Memory';
import DownloadIcon from '@mui/icons-material/Download';
import TableChartIcon from '@mui/icons-material/TableChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';

export default function Dashboard() {
    const [activeView, setActiveView] = useState('temperatura');
    const [displayMode, setDisplayMode] = useState('chart');

    const { data: dispositivos, isLoading: loadingDisp, isError: errorDisp } = useDispositivos();
    const { data: temperaturas, isLoading: loadingTemp } = useLeiturasTemperatura();
    const { data: umidades, isLoading: loadingUmid } = useLeiturasUmidade();
    const { data: sensores } = useSensores();

    if (loadingDisp || loadingTemp || loadingUmid)
        return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;

    if (errorDisp)
        return <Alert severity="error">Erro ao conectar com a API de monitoramento.</Alert>;

    const menuItems = [
        { id: 'temperatura', label: 'Temperatura', icon: <DeviceThermostatIcon color="primary" /> },
        { id: 'umidade', label: 'Umidade', icon: <WaterDropIcon sx={{ color: '#0288d1' }} /> },
        { id: 'dispositivos', label: 'Dispositivos', icon: <MemoryIcon color="success" /> }
    ];

    return (
        <Box sx={{ width: '100%' }}>
            {/* Cartões de Resumo */}
            <SummaryCards
                items={menuItems}
                activeView={activeView}
                onCardClick={setActiveView}
            />

            {/* Container Principal de Conteúdo */}
            <Card sx={{ p: 3, borderRadius: 4, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Typography variant="h6">
                        {activeView === 'temperatura' && "Histórico de Temperatura (°C)"}
                        {activeView === 'umidade' && "Níveis de Umidade (%)"}
                        {activeView === 'dispositivos' && "Status dos Dispositivos"}
                    </Typography>

                    {activeView !== 'dispositivos' && (
                        <Stack direction="row" spacing={2}>
                            <ToggleButtonGroup
                                value={displayMode}
                                exclusive
                                onChange={(e, next) => next && setDisplayMode(next)}
                                size="small"
                            >
                                <ToggleButton value="chart"><ShowChartIcon /></ToggleButton>
                                <ToggleButton value="table"><TableChartIcon /></ToggleButton>
                            </ToggleButtonGroup>
                            <Button
                                variant="outlined"
                                startIcon={<DownloadIcon />}
                                onClick={() => downloadCSV(activeView === 'temperatura' ? temperaturas : umidades, `dados_${activeView}`)}
                            >
                                CSV
                            </Button>
                        </Stack>
                    )}
                </Stack>

                <Divider sx={{ mb: 3 }} />

                {/* Aqui você renderiza o componente específico baseado na view */}
                {activeView === 'dispositivos' ? (
                    <DeviceStatusList dispositivos={dispositivos} sensores={sensores} />
                ) : (
                    <DataVisualizer
                        type={activeView}
                        mode={displayMode}
                        data={activeView === 'temperatura' ? temperaturas : umidades}
                    />
                )}
            </Card>
        </Box>
    );
}