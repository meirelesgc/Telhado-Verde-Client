import { useState } from 'react';
import { useLeituras } from './useLeituras';
import { downloadCSV } from '../utils/exportCsv';

export const useMonitoramento = () => {
    // 1. Estado local de filtros
    const [filtros, setFiltros] = useState({
        idDispositivo: 1,
        idSensor: '', // [NOVO] Estado para o sensor
        dataInicio: new Date().toISOString().split('T')[0],
        dataFim: new Date().toISOString().split('T')[0]
    });

    // 2. Buscas de dados (React Query)
    // O hook useLeituras já foi atualizado para ler filtros.idSensor
    const tempQuery = useLeituras('temperatura', filtros);
    const umidQuery = useLeituras('umidade', filtros);

    const isLoading = tempQuery.isLoading || umidQuery.isLoading;
    const isError = tempQuery.isError || umidQuery.isError;

    // 3. Preparação dos dados
    // Não precisamos mais "unificar" tudo numa tabela só. 
    // Vamos apenas formatar ou ordenar se necessário.
    const sortedTemp = (tempQuery.data || []).sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em));
    const sortedUmid = (umidQuery.data || []).sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em));

    // 4. Lógica de Download (Combina os dois para o CSV)
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
        temperaturaData: sortedTemp, // Dados ordenados para Gráfico e Tabela de Temp
        umidadeData: sortedUmid,     // Dados ordenados para Gráfico e Tabela de Umid
        isLoading,
        isError,
        handleDownloadCSV
    };
};