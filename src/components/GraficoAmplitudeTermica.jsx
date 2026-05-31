import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from 'recharts';
import { Box, Typography } from '@mui/material';

export default function GraficoAmplitudeTermica({ data }) {
    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Typography variant="h3" sx={{ textAlign: 'center', mb: 2 }}>
                Amplitude Térmica Diária
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="data" />
                    <YAxis unit="°C" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amplitude" name="Amplitude (°C)" fill="#fbbf24">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.amplitude > 10 ? '#ef4444' : '#10b981'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
}
