import React, { useState } from 'react';
import { 
    TablePagination, 
    Box, 
    Button, 
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

export default function TabelaHistorico({ leituras, dispositivos }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [prevLeituras, setPrevLeituras] = useState(leituras);

    if (leituras !== prevLeituras) {
        setPage(0);
        setPrevLeituras(leituras);
    }

    const getNomeDispositivo = (id) => {
        const dispositivo = dispositivos.find(d => d.id === id);
        return dispositivo ? dispositivo.nome : `ID: ${id}`;
    };

    const downloadCSV = () => {
        if (!leituras || leituras.length === 0) return;

        const headers = ['Dispositivo', 'Tipo', 'Valor', 'Unidade', 'Data', 'Hora'];
        const rows = leituras.map(l => {
            const dataHora = new Date(l.criado_em);
            return [
                getNomeDispositivo(l.id_dispositivo),
                l.tipo,
                l.valor.toFixed(2),
                l.tipo === 'temperatura' ? '°C' : '%',
                dataHora.toLocaleDateString(),
                dataHora.toLocaleTimeString()
            ];
        });

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `historico_leituras_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const leiturasPaginadas = leituras.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h2">
                    Histórico de Leituras
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    onClick={downloadCSV}
                    disabled={leituras.length === 0}
                    size="small"
                >
                    Exportar CSV
                </Button>
            </Box>

            <TableContainer component={Box} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Dispositivo</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Tipo</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Valor</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Data/Hora</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leiturasPaginadas.map((leitura) => (
                            <TableRow key={leitura.id} hover>
                                <TableCell>
                                    {getNomeDispositivo(leitura.id_dispositivo)}
                                </TableCell>
                                <TableCell>
                                    <Chip 
                                        size="small" 
                                        icon={leitura.tipo === 'temperatura' ? <ThermostatIcon /> : <WaterDropIcon />}
                                        label={leitura.tipo === 'temperatura' ? 'Temp' : 'Umid'}
                                        color={leitura.tipo === 'temperatura' ? 'error' : 'primary'}
                                        variant="outlined"
                                        sx={{ textTransform: 'capitalize' }}
                                    />
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, fontFamily: 'monospace.fontFamily' }}>
                                    {leitura.valor.toFixed(1)} {leitura.tipo === 'temperatura' ? '°C' : '%'}
                                </TableCell>
                                <TableCell sx={{ fontFamily: 'monospace.fontFamily' }}>
                                    {new Date(leitura.criado_em).toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <TablePagination
                component="div"
                count={leituras.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Linhas:"
                rowsPerPageOptions={[5, 10, 25, 50]}
            />
        </Box>
    );
}
