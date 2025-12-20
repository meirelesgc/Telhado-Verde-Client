import api from './client';

export const getDispositivos = async () => {
    const { data } = await api.get('/dispositivo');
    return data;
};

export const getSensores = async () => {
    const { data } = await api.get('/sensor');
    return data;
};

export const getLeiturasTemperatura = async () => {
    const { data } = await api.get('/leitura_temperatura');
    return data;
};

export const getLeiturasUmidade = async () => {
    const { data } = await api.get('/leitura_umidade');
    return data;
};