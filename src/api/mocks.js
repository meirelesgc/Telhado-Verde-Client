import MockAdapter from 'axios-mock-adapter';
import api from './client';

const mock = new MockAdapter(api, { delayResponse: 500 });

const dispositivos = [
    { id_dispositivo: 1, nome: 'Sensor Telhado Norte', latitude: -23.5505, longitude: -46.6333 },
    { id_dispositivo: 2, nome: 'Sensor Varanda Sul', latitude: -23.5510, longitude: -46.6340 }
];

const sensores = [
    { id_sensor: 101, id_dispositivo: 1, tipo: 'Temperatura' },
    { id_sensor: 102, id_dispositivo: 1, tipo: 'Humidade' }
];

mock.onGet('/dispositivo').reply(200, dispositivos);

mock.onGet('/sensor').reply(200, sensores);

mock.onGet('/leitura_temperatura').reply(200, [
    { id_leitura: 1, id_sensor: 101, valor: 25.5, criado_em: new Date().toISOString() },
    { id_leitura: 2, id_sensor: 101, valor: 26.2, criado_em: new Date().toISOString() }
]);

mock.onGet('/leitura_umidade').reply(200, [
    { id_leitura: 1, id_sensor: 102, valor: 65.0, criado_em: new Date().toISOString() }
]);

export default mock;