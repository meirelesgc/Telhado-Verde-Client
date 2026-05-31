import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { Box, Typography } from '@mui/material';

export default function GraficoMediaMovel({ data, titulo, cor }) {
    const dataFormatada = data.map(item => ({
        ...item,
        tempoFormatado: new Date(item.inicio_janela).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })
    }));

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Typography variant="h3" sx={{ textAlign: 'center', mb: 2 }}>
                {titulo}
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart data={dataFormatada} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tempoFormatado" />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip />
                    <Legend />
                    <Line 
                        type="monotone" 
                        dataKey="media" 
                        stroke={cor} 
                        name="Média Suavizada" 
                        dot={false}
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
}
