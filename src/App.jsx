import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Configuracoes from './pages/Configuracoes';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rota Pai que contém o Layout */}
                <Route path="/" element={<MainLayout />}>

                    {/* Rotas Filhas (Renderizadas dentro do Outlet do MainLayout) */}
                    <Route index element={<Dashboard />} /> {/* Caminho padrão "/" */}
                    <Route path="configuracoes" element={<Configuracoes />} />

                    {/* Rota de erro 404 (Opcional) */}
                    <Route path="*" element={<div>Página não encontrada</div>} />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;