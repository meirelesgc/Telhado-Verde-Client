import { useState } from 'react';
import { useLeituras } from './useLeituras';
import { downloadCSV } from '../utils/exportCsv';

export const useMonitoramento = () => {
    const [filtros, setFiltros] = useState({
        idDispositivo: 1,
        idSensor: '',
        dataInicio: new Date().toISOString().split('T')[0],
        dataFim: new Date().toISOString().split('T')[0]
    });

    const tempQuery = useLeituras('temperatura', filtros);
    const umidQuery = useLeituras('umidade', filtros);

    const isLoading = tempQuery.isLoading || umidQuery.isLoading;
    const isError = tempQuery.isError || umidQuery.isError;

    const sortedTemp = (tempQuery.data || []).sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em));
    const sortedUmid = (umidQuery.data || []).sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em));

    const handleDownloadCSV = () => {
        const dadosParaBaixar = [
            ...sortedTemp.map(d => ({ ...d, tipo: 'Temperatura' })),
            ...sortedUmid.map(d => ({ ...d, tipo: 'Umidade' }))
        ];
        downloadCSV(dadosParaBaixar, `relatorio_${filtros.dataInicio}.csv`);
    };

    return {
        filtros,
        setFiltros,
        temperaturaData: sortedTemp,
        umidadeData: sortedUmid,
        isLoading,
        isError,
        handleDownloadCSV
    };
};