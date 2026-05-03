import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as services from '../api/services';

export const useDispositivos = (skip = 0, limit = 100) => {
    return useQuery({
        queryKey: ['dispositivos', skip, limit],
        queryFn: () => services.getDispositivos(skip, limit),
    });
};

export const useBuscarDispositivo = (id) => {
    return useQuery({
        queryKey: ['dispositivo', id],
        queryFn: () => services.buscarDispositivo(id),
        enabled: !!id,
    });
};

export const useSensores = () => {
    return useQuery({
        queryKey: ['sensores'],
        queryFn: services.getSensores,
    });
};

export const useLeituras = (filtros) => {
    return useQuery({
        queryKey: ['leituras', filtros],
        queryFn: () => services.listarLeituras(filtros),
    });
};

export const useLeiturasTemperatura = (filtros) => {
    return useQuery({
        queryKey: ['leituras', 'temperatura', filtros],
        queryFn: () => services.getLeiturasTemperatura(filtros),
    });
};

export const useLeiturasUmidade = (filtros) => {
    return useQuery({
        queryKey: ['leituras', 'umidade', filtros],
        queryFn: () => services.getLeiturasUmidade(filtros),
    });
};

export const useUltimasLeiturasSensores = () => {
    return useQuery({
        queryKey: ['leituras', 'ultimas'],
        queryFn: services.getUltimasLeiturasSensores,
    });
};

export const useEstatisticasLeituras = (filtros) => {
    return useQuery({
        queryKey: ['leituras', 'estatisticas', filtros],
        queryFn: () => services.getEstatisticasLeituras(filtros),
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

export const useAtualizarDispositivo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => services.atualizarDispositivo(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['dispositivos'] });
            queryClient.invalidateQueries({ queryKey: ['dispositivo', variables.id] });
        },
    });
};

export const useDeletarDispositivo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: services.deletarDispositivo,
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