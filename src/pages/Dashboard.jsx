import React, { useState } from 'react';
import {
    Box, CircularProgress, Alert, Card, Stack,
    Typography, Divider, Button, ToggleButton,
    ToggleButtonGroup, TextField, MenuItem, Select,
    FormControl, InputLabel, Grid, Paper
} from '@mui/material';

import {
    useDispositivos,
    useLeiturasTemperatura,
    useLeiturasUmidade,
    useSensores,
    useEstatisticasLeituras
} from '../hooks/useTelhadoVerde';
import { downloadCSV } from '../utils/exportUtils';

import { SummaryCards } from './DashboardComponents/SummaryCards';
import { DataVisualizer } from './DashboardComponents/DataVisualizer';
import { DeviceStatusList } from './DashboardComponents/DeviceStatusList';

import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import MemoryIcon from '@mui/icons-material/Memory';
import DownloadIcon from '@mui/icons-material/Download';
import TableChartIcon from '@mui/icons-material/TableChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function Dashboard() {
    const [activeView, setActiveView] = useState('temperatura');
    const [displayMode, setDisplayMode] = useState('chart');

    const [filtros, setFiltros] = useState({
        skip: 0,
        limit: 100
    });

    const { data: dispositivos, isLoading: loadingDisp, isError: errorDisp } = useDispositivos(0, 100);
    const { data: sensores } = useSensores();
    const { data: temperaturas, isLoading: loadingTemp } = useLeiturasTemperatura(filtros);
    const { data: umidades, isLoading: loadingUmid } = useLeiturasUmidade(filtros);

    const { data: estatisticas } = useEstatisticasLeituras({
        id_sensor: filtros.id_sensor,
        tipo: activeView !== 'dispositivos' ? activeView : undefined
    });

    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltros(prev => {
            const novosFiltros = { ...prev, [name]: value };
            if (name === 'id_dispositivo') {
                novosFiltros.id_sensor = '';
            }
            return novosFiltros;
        });
    };

    const sensoresFiltrados = filtros.id_dispositivo
        ? sensores?.filter(s => s.id_dispositivo === filtros.id_dispositivo)
        : sensores;

    if (loadingDisp || (activeView === 'temperatura' && loadingTemp) || (activeView === 'umidade' && loadingUmid)) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (errorDisp) {
        return <Alert severity="error" sx={{ m: 2 }}>Erro ao conectar com a API de monitoramento.</Alert>;
    }

    const menuItems = [
        { id: 'temperatura', label: 'Temperatura', icon: <DeviceThermostatIcon color="primary" /> },
        { id: 'umidade', label: 'Umidade', icon: <WaterDropIcon color="primary" /> },
        { id: 'dispositivos', label: 'Dispositivos', icon: <MemoryIcon color="secondary" /> }
    ];

    const dadosAtuais = activeView === 'temperatura' ? temperaturas?.dados : umidades?.dados;

    return (
        <Box sx={{ width: '100%' }}>
            <Card sx={{ p: 2, mb: 3, borderRadius: 4, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={3}
                    alignItems="center"
                    justifyContent="flex-start"
                >
                    <Stack direction="row" spacing={1} alignItems="center">
                        <FilterListIcon color="action" />
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                            Filtrar Dados:
                        </Typography>
                    </Stack>

                    <FormControl size="small" sx={{ minWidth: 200 }}>
                        <InputLabel>Dispositivo</InputLabel>
                        <Select
                            name="id_dispositivo"
                            value={filtros.id_dispositivo || ''}
                            label="Dispositivo"
                            onChange={handleFiltroChange}
                        >
                            <MenuItem value=""><em>Todos</em></MenuItem>
                            {dispositivos?.dados?.map(disp => (
                                <MenuItem key={disp.id} value={disp.id}>
                                    {disp.nome}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 200 }} disabled={!filtros.id_dispositivo && !sensores}>
                        <InputLabel>Sensor</InputLabel>
                        <Select
                            name="id_sensor"
                            value={filtros.id_sensor || ''}
                            label="Sensor"
                            onChange={handleFiltroChange}
                        >
                            <MenuItem value=""><em>Todos os sensores</em></MenuItem>
                            {sensoresFiltrados?.map(s => (
                                <MenuItem key={s.id_sensor} value={s.id_sensor}>
                                    {s.tipo} (ID: {s.id_sensor})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Data"
                        type="date"
                        name="data"
                        value={filtros.data || ''}
                        onChange={handleFiltroChange}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: { xs: '100%', md: 'auto' } }}
                    />
                </Stack>
            </Card>

            <SummaryCards
                items={menuItems}
                activeView={activeView}
                onCardClick={setActiveView}
            />

            {activeView !== 'dispositivos' && estatisticas && estatisticas.length > 0 && (
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    {estatisticas.map(est => (
                        <Grid item xs={12} sm={6} md={3} key={`est-${est.id_sensor}`}>
                            <Paper sx={{ p: 2, textAlign: 'center', border: '1px solid #eee' }} elevation={0}>
                                <Typography variant="caption" color="text.secondary" display="block">
                                    Sensor ID: {est.id_sensor}
                                </Typography>
                                <Typography variant="body2">
                                    Mín: {est.minimo} | Máx: {est.maximo}
                                </Typography>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Média: {est.media}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Registros: {est.total_leituras}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}

            <Card sx={{ p: 3, borderRadius: 4, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 3, gap: 2 }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        {activeView === 'temperatura' && "Histórico de Temperatura (°C)"}
                        {activeView === 'umidade' && "Níveis de Umidade (%)"}
                        {activeView === 'dispositivos' && "Status da Infraestrutura"}
                    </Typography>

                    {activeView !== 'dispositivos' && (
                        <Stack direction="row" spacing={2}>
                            <ToggleButtonGroup
                                value={displayMode}
                                exclusive
                                onChange={(e, next) => next && setDisplayMode(next)}
                                size="small"
                                color="primary"
                            >
                                <ToggleButton value="chart"><ShowChartIcon /></ToggleButton>
                                <ToggleButton value="table"><TableChartIcon /></ToggleButton>
                            </ToggleButtonGroup>

                            <Button
                                variant="outlined"
                                startIcon={<DownloadIcon />}
                                onClick={() => downloadCSV(
                                    dadosAtuais,
                                    `exportacao_${activeView}_${filtros.id_dispositivo || 'geral'}`
                                )}
                            >
                                Exportar
                            </Button>
                        </Stack>
                    )}
                </Stack>

                <Divider sx={{ mb: 3 }} />

                {activeView === 'dispositivos' ? (
                    <DeviceStatusList dispositivos={dispositivos?.dados} sensores={sensores} />
                ) : (
                    <DataVisualizer
                        type={activeView}
                        mode={displayMode}
                        data={dadosAtuais}
                    />
                )}
            </Card>
        </Box>
    );
}