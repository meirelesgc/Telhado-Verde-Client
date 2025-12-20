import { useState, useMemo } from 'react';
import { useLeituras } from './useLeituras';
import { downloadCSV } from '../utils/exportCsv';

export const useMonitoramento = () => {
    // 1. Estado local de filtros
    const [filtros, setFiltros] = useState({
        idDispositivo: 1,
        dataInicio: new Date().toISOString().split('T')[0],
        dataFim: new Date().toISOString().split('T')[0]
    });

    // 2. Buscas de dados (React Query)
    const tempQuery = useLeituras('temperatura', filtros);
    const umidQuery = useLeituras('umidade', filtros);

    const isLoading = tempQuery.isLoading || umidQuery.isLoading;
    const isError = tempQuery.isError || umidQuery.isError;

    // 3. Processamento de dados (Memoizado para performance)
    // Aqui centralizamos a lógica de unir os dados para a tabela
    const dadosUnificados = useMemo(() => {
        if (isLoading || isError) return [];

        const temps = (tempQuery.data || []).map(d => ({ ...d, tipo: 'Temperatura' }));
        const umids = (umidQuery.data || []).map(d => ({ ...d, tipo: 'Umidade' }));

        return [...temps, ...umids]
            .sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em));
    }, [tempQuery.data, umidQuery.data, isLoading, isError]);

    // 4. Lógica de Download
    const handleDownloadCSV = () => {
        if (dadosUnificados.length > 0) {
            downloadCSV(dadosUnificados, `relatorio_${filtros.dataInicio}.csv`);
        }
    };

    return {
        filtros,
        setFiltros,
        temperaturaData: tempQuery.data || [],
        umidadeData: umidQuery.data || [],
        tabelaData: dadosUnificados.slice(0, 50), // Regra de negócio: mostrar apenas top 50 na tela
        isLoading,
        isError,
        handleDownloadCSV
    };
};