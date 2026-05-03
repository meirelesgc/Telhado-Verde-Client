import api from './client';

export const getDispositivos = async () => {
    return [
        { id_dispositivo: 1, nome: 'Sensor Telhado', latitude: -23.55, longitude: -46.63 }
    ];
};

export const getSensores = async () => {
    return [
        { id_sensor: 1, id_dispositivo: 1, tipo: 'Temperatura' },
        { id_sensor: 1, id_dispositivo: 1, tipo: 'Umidade' }
    ];
};

export const getLeiturasTemperatura = async (filtros) => {
    const payload = {
        tipo: 'temperatura'
    };

    if (filtros?.data_inicio) {
        payload.data = filtros.data_inicio.split('T')[0];
    }

    if (filtros?.id_sensor) {
        payload.id_sensor = filtros.id_sensor;
    }

    const response = await api.post('/leitura/filtro', payload);
    return response.data;
};

export const getLeiturasUmidade = async (filtros) => {
    const payload = {
        tipo: 'umidade'
    };

    if (filtros?.data_inicio) {
        payload.data = filtros.data_inicio.split('T')[0];
    }

    if (filtros?.id_sensor) {
        payload.id_sensor = filtros.id_sensor;
    }

    const response = await api.post('/leitura/filtro', payload);
    return response.data;
};
export const inserirDispositivo = async (dispositivoData) => {
    const response = await api.post('/dispositivo/', dispositivoData);
    return response.data;
};

export const inserirLeitura = async (leituraData) => {
    const response = await api.post('/leitura/', leituraData);
    return response.data;
};

export const listarLeituraPorTipo = async (tipo) => {
    const response = await api.get(`/leitura/${tipo}`);
    return response.data;
};

export const buscarLeitura = async (tipo, id) => {
    const response = await api.get(`/leitura/${tipo}/${id}`);
    return response.data;
};

export const deletarLeitura = async (id) => {
    const response = await api.delete(`/leitura/${id}`);
    return response.data;
};