import React from 'react';
import { Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Formatação auxiliar movida para cá ou utils
const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
};

export const SensorChart = ({ title, data, dataKey = "valor", color, unit = "" }) => (
    <Paper sx={{ p: 2, height: 350 }}>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="criado_em" tickFormatter={formatXAxis} />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip labelFormatter={(label) => new Date(label).toLocaleString()} />
                <Line
                    type="monotone"
                    dataKey={dataKey}
                    stroke={color}
                    dot={false}
                    strokeWidth={2}
                    name={`${title} (${unit})`}
                />
            </LineChart>
        </ResponsiveContainer>
    </Paper>
);