import React, { useState, useEffect } from 'react';
import { TablePagination } from '@mui/material';

export default function TabelaHistorico({ leituras, dispositivos }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        setPage(0);
    }, [leituras]);

    const getNomeDispositivo = (id) => {
        const dispositivo = dispositivos.find(d => d.id === id);
        return dispositivo ? dispositivo.nome : `ID: ${id}`;
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
        <div>
            <div style={{ overflowX: 'auto', border: '1px solid #ccc' }}>
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
        </div>
    );
}