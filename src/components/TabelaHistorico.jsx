import React, { useState } from 'react';
import { TablePagination, Box, Button, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

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
                    sx={{ borderRadius: '12px' }}
                >
                    Exportar CSV
                </Button>
            </Box>

            <div style={{ overflowX: 'auto', border: '1px solid #ccc', borderRadius: '8px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f4f4f4' }}>
                        <tr>
                            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Dispositivo</th>
                            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Tipo</th>
                            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Valor</th>
                            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Data/Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leiturasPaginadas.map((leitura) => (
                            <tr key={leitura.id}>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    {getNomeDispositivo(leitura.id_dispositivo)}
                                </td>
                                <td style={{ border: '1px solid #ccc', padding: '8px', textTransform: 'capitalize' }}>
                                    {leitura.tipo}
                                </td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    {leitura.valor.toFixed(1)} {leitura.tipo === 'temperatura' ? '°C' : '%'}
                                </td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    {new Date(leitura.criado_em).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <TablePagination
                component="div"
                count={leituras.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Linhas por página:"
                rowsPerPageOptions={[5, 10, 25, 50]}
            />
        </Box>
    );
}