import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { Box, Typography } from '@mui/material';

export default function GraficoTaxaDesidratacao({ data }) {
    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Typography variant="h3" sx={{ textAlign: 'center', mb: 2 }}>
                Taxa de Desidratação (%/h)
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="data" />
                    <YAxis unit="%/h" />
                    <Tooltip />
                    <Area 
                        type="monotone" 
                        dataKey="taxa_por_hora" 
                        stroke="#3b82f6" 
                        fill="#3b82f6" 
                        name="Taxa de Perda"
                        fillOpacity={0.3}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </Box>
    );
}
