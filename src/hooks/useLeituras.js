import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const fetchLeituras = async ({ queryKey }) => {
    const [_, params] = queryKey;
    const { tipo, dataInicio, dataFim, idDispositivo } = params;

    // Mapeia o tipo solicitado para o Endpoint correto da tabela
    // Ex: se tipo for 'temperatura', chama /leitura_temperatura
    const endpoint = `/leitura_${tipo}`;

    const response = await api.get(endpoint, {
        params: {
            // Ajuste os parâmetros conforme o backend espera
            id_dispositivo: idDispositivo, // O backend deve filtrar sensores deste dispositivo
            start: dataInicio,
            end: dataFim
        }
    });

    return response.data;
};

export const useLeituras = (tipo, filtros) => {
    return useQuery({
        queryKey: ['leituras', { tipo, ...filtros }],
        queryFn: fetchLeituras,
        enabled: !!filtros.idDispositivo,
        staleTime: 1000 * 60 * 5, // Cache de 5 minutos
    });
};