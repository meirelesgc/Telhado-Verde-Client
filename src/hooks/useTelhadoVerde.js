import { useQuery } from '@tanstack/react-query';
import * as services from '../api/services';

export const useDispositivos = () => {
    return useQuery({
        queryKey: ['dispositivos'],
        queryFn: services.getDispositivos,
    });
};

export const useSensores = () => {
    return useQuery({
        queryKey: ['sensores'],
        queryFn: services.getSensores,
    });
};

export const useLeiturasTemperatura = (filtros) => {
    return useQuery({
        queryKey: ['leituras', 'temperatura', filtros],
        queryFn: () => services.getLeiturasTemperatura(filtros),
        enabled: !!filtros?.data_inicio && !!filtros?.data_fim,
    });
};

export const useLeiturasUmidade = (filtros) => {
    return useQuery({
        queryKey: ['leituras', 'umidade', filtros],
        queryFn: () => services.getLeiturasUmidade(filtros),
        enabled: !!filtros?.data_inicio && !!filtros?.data_fim,
    });
};