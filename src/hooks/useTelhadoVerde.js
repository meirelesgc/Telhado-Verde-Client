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

export const useLeiturasTemperatura = () => {
    return useQuery({
        queryKey: ['leituras', 'temperatura'],
        queryFn: services.getLeiturasTemperatura,
    });
};

export const useLeiturasUmidade = () => {
    return useQuery({
        queryKey: ['leituras', 'umidade'],
        queryFn: services.getLeiturasUmidade,
    });
};