import React, { useState } from 'react';
import {
    Box, CircularProgress, Alert, Card, Stack,
    Typography, Divider, Button, ToggleButton,
    ToggleButtonGroup, TextField, MenuItem, Select,
    FormControl, InputLabel
} from '@mui/material';

// Hooks e Utils
import {
    useDispositivos,
    useLeiturasTemperatura,
    useLeiturasUmidade,
    useSensores
} from '../hooks/useTelhadoVerde';
import { downloadCSV } from '../utils/exportUtils';

// Componentes
import { SummaryCards } from './DashboardComponents/SummaryCards';
import { DataVisualizer } from './DashboardComponents/DataVisualizer';
import { DeviceStatusList } from './DashboardComponents/DeviceStatusList';

// Ícones
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import MemoryIcon from '@mui/icons-material/Memory';
import DownloadIcon from '@mui/icons-material/Download';
import TableChartIcon from '@mui/icons-material/TableChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function Dashboard() {
    // 1. Estados de Controle
    const [activeView, setActiveView] = useState('temperatura');
    const [displayMode, setDisplayMode] = useState('chart');

    // 2. Estado Único de Filtros
    const [filtros, setFiltros] = useState({
        data_inicio: new Date(Date.now() - 86400000).toISOString().slice(0, 16),
        data_fim: new Date().toISOString().slice(0, 16),
        id_dispositivo: ''
    });

    // 3. Busca de Dados (React Query)
    const { data: dispositivos, isLoading: loadingDisp, isError: errorDisp } = useDispositivos();
    const { data: temperaturas, isLoading: loadingTemp } = useLeiturasTemperatura(filtros);
    const { data: umidades, isLoading: loadingUmid } = useLeiturasUmidade(filtros);
    const { data: sensores } = useSensores();

    // 4. Manipulador de Mudanças nos Filtros
    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltros(prev => ({ ...prev, [name]: value }));
    };

    // 5. Tratamento de Estados de Carregamento e Erro
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
        { id: 'umidade', label: 'Umidade', icon: <WaterDropIcon sx={{ color: '#0288d1' }} /> },
        { id: 'dispositivos', label: 'Dispositivos', icon: <MemoryIcon color="success" /> }
    ];

    return (
        <Box sx={{ width: '100%' }}>
            {/* Barra de Filtros Consolidada */}
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

                    {/* Seletor de Dispositivo */}
                    <FormControl size="small" sx={{ minWidth: 220 }}>
                        <InputLabel>Dispositivo</InputLabel>
                        <Select
                            name="id_dispositivo"
                            value={filtros.id_dispositivo}
                            label="Dispositivo"
                            onChange={handleFiltroChange}
                        >
                            <MenuItem value=""><em>Todos os dispositivos</em></MenuItem>
                            {dispositivos?.map(disp => (
                                <MenuItem key={disp.id_dispositivo} value={disp.id_dispositivo}>
                                    {disp.nome}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Data Início */}
                    <TextField
                        label="Data Inicial"
                        type="datetime-local"
                        name="data_inicio"
                        value={filtros.data_inicio}
                        onChange={handleFiltroChange}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: { xs: '100%', md: 'auto' } }}
                    />

                    {/* Data Fim */}
                    <TextField
                        label="Data Final"
                        type="datetime-local"
                        name="data_fim"
                        value={filtros.data_fim}
                        onChange={handleFiltroChange}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: { xs: '100%', md: 'auto' } }}
                    />
                </Stack>
            </Card>

            {/* Cartões de Seleção de Categoria */}
            <SummaryCards
                items={menuItems}
                activeView={activeView}
                onCardClick={setActiveView}
            />

            {/* Área Principal de Visualização */}
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
                                    activeView === 'temperatura' ? temperaturas : umidades,
                                    `exportacao_${activeView}_${filtros.id_dispositivo || 'geral'}`
                                )}
                            >
                                Exportar
                            </Button>
                        </Stack>
                    )}
                </Stack>

                <Divider sx={{ mb: 3 }} />

                {/* Renderização Condicional do Conteúdo */}
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