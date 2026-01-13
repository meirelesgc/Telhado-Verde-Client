import api from './client';

// FUNÇÕES QUE CONTINUAM MOCKADAS (Pois a API não tem endpoint)
// Você pode importar do mock ou retornar dados fixos aqui temporariamente
export const getDispositivos = async () => {
    // Retornando fixo pois a API não implementa 'listarDispositivos'
    return [
        { id_dispositivo: 1, nome: 'Sensor Telhado (API Off)', latitude: -23.55, longitude: -46.63 }
    ];
};

export const getSensores = async () => {
    // Retornando fixo pois a API não implementa 'listarSensores'
    return [
        { id_sensor: 1, id_dispositivo: 1, tipo: 'Temperatura' },
        { id_sensor: 1, id_dispositivo: 1, tipo: 'Humidade' } // Atenção: backend usa 'Humidade' ou 'Umidade'? Validar string.
    ];
};

// FUNÇÕES CONECTADAS À API
export const getLeiturasTemperatura = async (filtros) => {
    // A API só aceita YYYY-MM-DD. Pegamos a data inicial do filtro.
    const dataFormatada = filtros.data_inicio ? filtros.data_inicio.split('T')[0] : new Date().toISOString().split('T')[0];

    // O Axios fará um POST na URL base definida no client.js
    const response = await api.post('', JSON.stringify({
        action: 'listarPorDia',
        tipo: 'temperatura',
        data: dataFormatada,
        // Opcional: passar id_sensor se o seu filtro tiver
        // id_sensor: 1 
    }));

    // A API retorna { status: 'ok', dados: [...] }. Precisamos retornar apenas o array.
    return response.data.dados || [];
};

export const getLeiturasUmidade = async (filtros) => {
    const dataFormatada = filtros.data_inicio ? filtros.data_inicio.split('T')[0] : new Date().toISOString().split('T')[0];

    const response = await api.post('', JSON.stringify({
        action: 'listarPorDia',
        tipo: 'umidade',
        data: dataFormatada
    }));

    return response.data.dados || [];
};