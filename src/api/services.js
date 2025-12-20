import api from './client';

export const getDispositivos = async () => {
    const { data } = await api.get('/dispositivo');
    return data;
};

export const getSensores = async () => {
    const { data } = await api.get('/sensor');
    return data;
};

export const getLeiturasTemperatura = async (params) => {
    const { data } = await api.get('/leitura_temperatura', { params });
    return data;
};

export const getLeiturasUmidade = async (params) => {
    const { data } = await api.get('/leitura_umidade', { params });
    return data;
};