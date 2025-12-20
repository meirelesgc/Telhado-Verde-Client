import React from 'react';
import { Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

export const RecentReadingsTable = ({ data }) => (
    <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Últimas Leituras (Tempo Real)</Typography>
        <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Data/Hora</TableCell>
                        <TableCell>Sensor ID</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell align="right">Valor</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={`${row.tipo}-${row.id_leitura}`}>
                            <TableCell>{new Date(row.criado_em).toLocaleString()}</TableCell>
                            <TableCell>{row.id_sensor}</TableCell>
                            <TableCell>{row.tipo}</TableCell>
                            <TableCell align="right">{row.valor}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>
);