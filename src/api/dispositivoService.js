import client from './client';

export const dispositivoService = {
    inserir: (data) => client.post('/dispositivo/', data),
    listar: (params) => client.get('/dispositivo/', { params }),
    obter: (id) => client.get(`/dispositivo/${id}`),
    atualizar: (id, data) => client.put(`/dispositivo/${id}`, data),
    deletar: (id) => client.delete(`/dispositivo/${id}`)
};