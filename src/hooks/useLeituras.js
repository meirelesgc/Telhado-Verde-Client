import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const fetchLeituras = async ({ queryKey }) => {
    const [_, params] = queryKey;
    const { tipo, dataInicio, dataFim, idDispositivo, idSensor } = params; // [ALTERADO] Recebe idSensor

    const endpoint = `/leitura_${tipo}`;

    const response = await api.get(endpoint, {
        params: {
            id_dispositivo: idDispositivo,
            id_sensor: idSensor || undefined, // [ALTERADO] Só envia se tiver valor
            start: dataInicio,
            end: dataFim
        }
    });

    return response.data;
};

export const useLeituras = (tipo, filtros) => {
    return useQuery({
        // [ALTERADO] Adicione idSensor na chave do cache para refetch automático
        queryKey: ['leituras', { tipo, ...filtros }],
        queryFn: fetchLeituras,
        enabled: !!filtros.idDispositivo, // Busca apenas se tiver dispositivo selecionado
        staleTime: 1000 * 60 * 5,
    });
};