import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

export const DashboardControls = ({ filtros, setFiltros, onDownload, disableDownload }) => (
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
            onClick={onDownload}
            disabled={disableDownload}
        >
            CSV
        </Button>
    </Box>
);