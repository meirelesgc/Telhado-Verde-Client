import React from 'react';
import { Box, TextField, Button, MenuItem } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

export const DashboardControls = ({ filtros, setFiltros, onDownload, disableDownload }) => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {/* Filtro de Dispositivo */}
        <TextField
            select
            label="Dispositivo"
            size="small"
            value={filtros.idDispositivo}
            onChange={(e) => setFiltros(prev => ({ ...prev, idDispositivo: e.target.value }))}
            sx={{ minWidth: 120 }}
        >
            <MenuItem value={1}>Dispositivo 01</MenuItem>
            <MenuItem value={2}>Dispositivo 02</MenuItem>
        </TextField>

        {/* Filtro de Sensor (Opcional) */}
        <TextField
            label="ID Sensor"
            placeholder="Todos"
            size="small"
            value={filtros.idSensor}
            onChange={(e) => setFiltros(prev => ({ ...prev, idSensor: e.target.value }))}
            sx={{ width: 100 }}
        />

        <TextField
            label="Início"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={filtros.dataInicio}
            onChange={(e) => setFiltros(prev => ({ ...prev, dataInicio: e.target.value }))}
        />
        <TextField
            label="Fim"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={filtros.dataFim}
            onChange={(e) => setFiltros(prev => ({ ...prev, dataFim: e.target.value }))}
        />

        <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={onDownload}
            disabled={disableDownload}
        >
            CSV
        </Button>
    </Box>
);