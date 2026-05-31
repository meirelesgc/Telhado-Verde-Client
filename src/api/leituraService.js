import client from './client';

export const leituraService = {
    inserir: (data) => client.post('/leitura/', data),
    listar: (params) => client.get('/leitura/', { params }),
    ultimaLeituraSensores: () => client.get('/leitura/agregacao/ultima-leitura'),
    estatisticas: (params) => client.get('/leitura/agregacao/estatisticas', { params }),
    mediaMovel: (params) => client.get('/leitura/agregacao/media-movel', { params }),
    amplitudeTermica: (params) => client.get('/leitura/agregacao/amplitude-termica', { params }),
    taxaDesidratacao: (params) => client.get('/leitura/agregacao/taxa-desidratacao', { params }),
    buscar: (id) => client.get(`/leitura/${id}`),
    deletar: (id) => client.delete(`/leitura/${id}`)
};