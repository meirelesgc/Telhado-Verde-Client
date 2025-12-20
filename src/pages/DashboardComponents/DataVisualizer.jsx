import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';

/**
 * Componente interno para renderizar a tabela de dados
 * Isso ajuda a não repetir código para temperatura e umidade
 */
const DataTable = ({ data }) => (
    <TableContainer component={Paper} sx={{ maxHeight: 400, mt: 2, boxShadow: 'none', border: '1px solid #eee' }}>
        <Table stickyHeader size="small">
            <TableHead>
                <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Data/Hora</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="right">Valor</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>ID Sensor</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data?.map((row, index) => (
                    <TableRow key={index} hover>
                        <TableCell>{new Date(row.criado_em).toLocaleString('pt-BR')}</TableCell>
                        <TableCell align="right">{row.valor}</TableCell>
                        <TableCell>{row.id_sensor}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export const DataVisualizer = ({ type, mode, data }) => {
    // Se o modo selecionado for 'table', renderizamos a tabela e paramos aqui
    if (mode === 'table') {
        return <DataTable data={data} />;
    }

    // Se o modo for 'chart', verificamos o tipo para saber qual gráfico mostrar
    return (
        <Box sx={{ height: 350, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
                {type === 'temperatura' ? (
                    /* Gráfico de Área para Temperatura */
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="criado_em"
                            tickFormatter={(t) => new Date(t).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        />
                        <YAxis />
                        <Tooltip labelFormatter={(l) => new Date(l).toLocaleString('pt-BR')} />
                        <Area type="monotone" dataKey="valor" stroke="#1976d2" fillOpacity={0.1} fill="#1976d2" />
                    </AreaChart>
                ) : (
                    /* Gráfico de Barras para Umidade */
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="criado_em"
                            tickFormatter={(t) => new Date(t).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        />
                        <YAxis />
                        <Tooltip labelFormatter={(l) => new Date(l).toLocaleString('pt-BR')} />
                        <Bar dataKey="valor" fill="#0288d1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                )}
            </ResponsiveContainer>
        </Box>
    );
};