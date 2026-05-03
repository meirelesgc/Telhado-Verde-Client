import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
        enabled: !!filtros?.data_inicio,
    });
};

export const useLeiturasUmidade = (filtros) => {
    return useQuery({
        queryKey: ['leituras', 'umidade', filtros],
        queryFn: () => services.getLeiturasUmidade(filtros),
        enabled: !!filtros?.data_inicio,
    });
};

export const useInserirDispositivo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: services.inserirDispositivo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dispositivos'] });
        },
    });
};

export const useInserirLeitura = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: services.inserirLeitura,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leituras'] });
        },
    });
};

export const useDeletarLeitura = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: services.deletarLeitura,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leituras'] });
        },
    });
};