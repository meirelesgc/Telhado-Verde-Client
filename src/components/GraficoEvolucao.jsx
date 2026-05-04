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

export default function GraficoEvolucao({ data }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tempoFormatado" />
                <YAxis yAxisId="temp" orientation="left" stroke="#ef4444" domain={['dataMin - 2', 'dataMax + 2']} />
                <YAxis yAxisId="umid" orientation="right" stroke="#3b82f6" domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip />
                <Legend />
                <Line yAxisId="temp" type="monotone" dataKey="temperatura" stroke="#ef4444" name="Temperatura (°C)" dot={false} />
                <Line yAxisId="umid" type="monotone" dataKey="umidade" stroke="#3b82f6" name="Umidade (%)" dot={false} />
            </LineChart>
        </ResponsiveContainer>
    );
}