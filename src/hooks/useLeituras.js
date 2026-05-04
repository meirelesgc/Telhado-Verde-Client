import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leituraService } from '../api/leituraService';

export const useLeituras = (params) => {
    return useQuery({
        queryKey: ['leituras', params],
        queryFn: async () => {
            const { data } = await leituraService.listar(params);
            return data;
        },
    });
};

export const useUltimaLeitura = () => {
    return useQuery({
        queryKey: ['leituras', 'ultima'],
        queryFn: async () => {
            const { data } = await leituraService.ultimaLeituraSensores();
            return data;
        },
    });
};

export const useEstatisticasLeituras = (params) => {
    return useQuery({
        queryKey: ['leituras', 'estatisticas', params],
        queryFn: async () => {
            const { data } = await leituraService.estatisticas(params);
            return data;
        },
    });
};

export const useLeitura = (id) => {
    return useQuery({
        queryKey: ['leituras', id],
        queryFn: async () => {
            const { data } = await leituraService.buscar(id);
            return data;
        },
        enabled: !!id,
    });
};

export const useInserirLeitura = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (novaLeitura) => leituraService.inserir(novaLeitura),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leituras'] });
        },
    });
};

export const useDeletarLeitura = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => leituraService.deletar(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leituras'] });
        },
    });
};