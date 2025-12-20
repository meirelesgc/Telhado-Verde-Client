import AxiosMockAdapter from 'axios-mock-adapter';
import api from './api'; // Importa sua instância do axios

// Cria o adaptador na instância do axios
const mock = new AxiosMockAdapter(api, { delayResponse: 1000 }); // Simula 1s de delay de rede

// --- Funções Auxiliares de Geração de Dados ---

// Gera datas retroativas (do "agora" para trás)
const gerarDatas = (quantidade, intervaloSegundos = 4) => {
    const datas = [];
    const agora = new Date();
    for (let i = 0; i < quantidade; i++) {
        const novaData = new Date(agora.getTime() - (i * intervaloSegundos * 1000));
        datas.push(novaData.toISOString());
    }
    return datas.reverse(); // Ordena do mais antigo para o mais novo
};

// Gera temperatura que varia suavemente (Senoide simulando dia/noite + ruído)
const gerarTemperatura = (index) => {
    const base = 25; // 25 graus
    const variacao = Math.sin(index * 0.05) * 5; // Varia +/- 5 graus
    const ruido = (Math.random() - 0.5); // Pequeno ruído aleatório
    return parseFloat((base + variacao + ruido).toFixed(2));
};

// Gera umidade
const gerarUmidade = (index) => {
    const base = 60;
    const variacao = Math.cos(index * 0.05) * 20; // Oposto da temperatura
    const ruido = (Math.random() - 0.5) * 2;
    return parseFloat((base + variacao + ruido).toFixed(2));
};

// --- Definição das Rotas Mockadas ---

// 1. Rota de Sensores (Mockando a tabela sensor)
mock.onGet('/sensor').reply(200, [
    { id_sensor: 101, id_dispositivo: 1, tipo: 'temperatura' },
    { id_sensor: 102, id_dispositivo: 1, tipo: 'umidade' }
]);

// 2. Rota de Leitura de Temperatura
mock.onGet('/leitura_temperatura').reply((config) => {
    // Simula pegar 500 registros (aprox 30 minutos de dados a cada 4s)
    // Se quiser simular um dia inteiro, aumente para ~21600 registros
    const qtd = 500;
    const datas = gerarDatas(qtd);

    const dados = datas.map((data, i) => ({
        id_leitura: i + 10000,
        id_sensor: 101, // ID fixo para o mock
        valor: gerarTemperatura(i),
        criado_em: data
    }));

    return [200, dados];
});

// 3. Rota de Leitura de Umidade
mock.onGet('/leitura_umidade').reply((config) => {
    const qtd = 500;
    const datas = gerarDatas(qtd);

    const dados = datas.map((data, i) => ({
        id_leitura: i + 20000,
        id_sensor: 102,
        valor: gerarUmidade(i),
        criado_em: data
    }));

    return [200, dados];
});

// Pass-through (deixa passar requisições que não foram mockadas, se houver)
mock.onAny().passThrough();

console.log("⚠️ MOCK API ATIVADO: Dados falsos estão sendo gerados.");