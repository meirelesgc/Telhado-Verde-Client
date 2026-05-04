import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

export default function GraficoComparativo({ data, titulo, unidade, corPrincipal }) {
    const dataFormatada = data.map(s => ({
        ...s,
        name: `Sensor ${s.id_sensor}`
    }));

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>{titulo}</h3>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart data={dataFormatada} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis unit={unidade} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="minimo" fill="#94a3b8" name={`Mínimo (${unidade})`} />
                    <Bar dataKey="media" fill={corPrincipal} name={`Média (${unidade})`} />
                    <Bar dataKey="maximo" fill="#1e293b" name={`Máximo (${unidade})`} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}