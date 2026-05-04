import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dispositivoService } from '../api/dispositivoService';

export const useDispositivos = (params) => {
    return useQuery({
        queryKey: ['dispositivos', params],
        queryFn: async () => {
            const { data } = await dispositivoService.listar(params);
            return data;
        },
    });
};

export const useDispositivo = (id) => {
    return useQuery({
        queryKey: ['dispositivos', id],
        queryFn: async () => {
            const { data } = await dispositivoService.obter(id);
            return data;
        },
        enabled: !!id,
    });
};

export const useInserirDispositivo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (novoDispositivo) => dispositivoService.inserir(novoDispositivo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dispositivos'] });
        },
    });
};

export const useAtualizarDispositivo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, dados }) => dispositivoService.atualizar(id, dados),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['dispositivos'] });
            queryClient.invalidateQueries({ queryKey: ['dispositivos', variables.id] });
        },
    });
};

export const useDeletarDispositivo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => dispositivoService.deletar(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dispositivos'] });
        },
    });
};