import api from './client';

export const getDispositivos = async (skip = 0, limit = 100) => {
    const response = await api.get('/dispositivo/', {
        params: { skip, limit }
    });
    return response.data;
};

export const inserirDispositivo = async (dispositivoData) => {
    const response = await api.post('/dispositivo/', dispositivoData);
    return response.data;
};

export const buscarDispositivo = async (id) => {
    const response = await api.get(`/dispositivo/${id}`);
    return response.data;
};

export const atualizarDispositivo = async (id, dispositivoData) => {
    const response = await api.put(`/dispositivo/${id}`, dispositivoData);
    return response.data;
};

export const deletarDispositivo = async (id) => {
    const response = await api.delete(`/dispositivo/${id}`);
    return response.data;
};

export const getSensores = async () => {
    return [
        { id_sensor: 1, id_dispositivo: 1, tipo: 'Temperatura' },
        { id_sensor: 1, id_dispositivo: 1, tipo: 'Umidade' }
    ];
};

export const listarLeituras = async (filtros = {}) => {
    const params = {};

    if (filtros.tipo) params.tipo = filtros.tipo;
    if (filtros.data) params.data = filtros.data.split('T')[0];
    if (filtros.id_sensor) params.id_sensor = filtros.id_sensor;
    params.skip = filtros.skip || 0;
    params.limit = filtros.limit || 100;

    const response = await api.get('/leitura/', { params });
    return response.data;
};

export const getLeiturasTemperatura = async (filtros = {}) => {
    return listarLeituras({ ...filtros, tipo: 'temperatura' });
};

export const getLeiturasUmidade = async (filtros = {}) => {
    return listarLeituras({ ...filtros, tipo: 'umidade' });
};

export const inserirLeitura = async (leituraData) => {
    const response = await api.post('/leitura/', leituraData);
    return response.data;
};

export const buscarLeitura = async (id) => {
    const response = await api.get(`/leitura/${id}`);
    return response.data;
};

export const deletarLeitura = async (id) => {
    const response = await api.delete(`/leitura/${id}`);
    return response.data;
};

export const getUltimasLeiturasSensores = async () => {
    const response = await api.get('/leitura/agregacao/ultima-leitura');
    return response.data;
};

export const getEstatisticasLeituras = async (filtros = {}) => {
    const params = {};

    if (filtros.tipo) params.tipo = filtros.tipo;
    if (filtros.id_sensor) params.id_sensor = filtros.id_sensor;

    const response = await api.get('/leitura/agregacao/estatisticas', { params });
    return response.data;
};