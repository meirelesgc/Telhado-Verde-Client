import MockAdapter from 'axios-mock-adapter';
import api from './client';

const mock = new MockAdapter(api, { delayResponse: 500 });

// 1. Definição de Dispositivos e Sensores mais variados
const dispositivos = [
    { id_dispositivo: 1, nome: 'Sensor Telhado Norte', latitude: -23.5505, longitude: -46.6333 },
    { id_dispositivo: 2, nome: 'Sensor Varanda Sul', latitude: -23.5510, longitude: -46.6340 },
    { id_dispositivo: 3, nome: 'Horta Comunitária', latitude: -23.5520, longitude: -46.6350 }
];

const sensores = [
    { id_sensor: 101, id_dispositivo: 1, tipo: 'Temperatura' },
    { id_sensor: 102, id_dispositivo: 1, tipo: 'Humidade' },
    { id_sensor: 201, id_dispositivo: 2, tipo: 'Temperatura' },
    { id_sensor: 202, id_dispositivo: 2, tipo: 'Humidade' },
    { id_sensor: 301, id_dispositivo: 3, tipo: 'Temperatura' },
    { id_sensor: 302, id_dispositivo: 3, tipo: 'Humidade' }
];

// 2. Função Auxiliar para gerar dados temporais variados
const gerarDadosHistoricos = (idSensor, tipo, pontos = 48) => {
    const dados = [];
    const agora = new Date();

    for (let i = pontos; i > 0; i--) {
        const dataReferencia = new Date(agora.getTime() - i * 30 * 60000); // Pontos a cada 30 min
        let valor;

        if (tipo === 'temperatura') {
            // Simula ciclo circadiano: mais quente ao meio dia, mais frio à noite
            const hora = dataReferencia.getHours();
            const baseTemp = 22 + Math.sin((hora - 8) * Math.PI / 12) * 8;
            valor = parseFloat((baseTemp + (Math.random() * 2)).toFixed(1));
        } else {
            // Umidade: flutuações aleatórias entre 40% e 90%
            valor = parseFloat((60 + Math.sin(i * 0.5) * 20 + (Math.random() * 10)).toFixed(1));
        }

        dados.push({
            id_leitura: Math.floor(Math.random() * 100000),
            id_sensor: idSensor,
            valor: valor,
            criado_em: dataReferencia.toISOString()
        });
    }
    return dados;
};

// 3. Configuração dos Endpoints do Mock
mock.onGet('/dispositivo').reply(200, dispositivos);
mock.onGet('/sensor').reply(200, sensores);

// Endpoint de Temperatura: Consolida dados de todos os sensores de temperatura
mock.onGet('/leitura_temperatura').reply((config) => {
    const { id_dispositivo } = config.params || {};

    // Se filtrar por dispositivo, pegamos apenas o sensor dele, senão pegamos o 101 por padrão
    const sensorId = id_dispositivo === 2 ? 201 : (id_dispositivo === 3 ? 301 : 101);
    const dados = gerarDadosHistoricos(sensorId, 'temperatura');

    return [200, dados];
});

// Endpoint de Umidade: Consolida dados de todos os sensores de umidade
mock.onGet('/leitura_umidade').reply((config) => {
    const { id_dispositivo } = config.params || {};

    const sensorId = id_dispositivo === 2 ? 202 : (id_dispositivo === 3 ? 302 : 102);
    const dados = gerarDadosHistoricos(sensorId, 'umidade');

    return [200, dados];
});

export default mock;