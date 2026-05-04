import client from './client';

export const leituraService = {
    inserir: (data) => client.post('/leitura/', data),
    listar: (params) => client.get('/leitura/', { params }),
    ultimaLeituraSensores: () => client.get('/leitura/agregacao/ultima-leitura'),
    estatisticas: (params) => client.get('/leitura/agregacao/estatisticas', { params }),
    buscar: (id) => client.get(`/leitura/${id}`),
    deletar: (id) => client.delete(`/leitura/${id}`)
};