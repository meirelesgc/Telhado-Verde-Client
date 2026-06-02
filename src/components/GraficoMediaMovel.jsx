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
import { useChartWidth, calculateTickInterval } from '../hooks/useChartUtils';

export default function GraficoMediaMovel({ data, titulo }) {
    const { ref, width } = useChartWidth();
    
    const dataFormatada = data.map(item => ({
        ...item,
        tempoFormatado: new Date(item.inicio_janela).toLocaleDateString([], {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })
    }));

    const interval = calculateTickInterval(width, dataFormatada.length, 100);

    return (
        <Box ref={ref} sx={{ width: '100%', height: '100%' }}>
            <Typography variant="h3" sx={{ textAlign: 'center', mb: 2 }}>
                {titulo}
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart data={dataFormatada} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="tempoFormatado" 
                        interval={interval}
                    />
                    <YAxis yAxisId="temp" orientation="left" stroke="#ef4444" domain={['auto', 'auto']} />
                    <YAxis yAxisId="umid" orientation="right" stroke="#3b82f6" domain={['auto', 'auto']} />
                    <Tooltip />
                    <Legend />
                    <Line 
                        yAxisId="temp"
                        type="monotone" 
                        dataKey="temperatura" 
                        stroke="#ef4444" 
                        name="Temp. Média (°C)" 
                        dot={false}
                        strokeWidth={2}
                    />
                    <Line 
                        yAxisId="umid"
                        type="monotone" 
                        dataKey="umidade" 
                        stroke="#3b82f6" 
                        name="Umid. Média (%)" 
                        dot={false}
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
}
