import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Configuracoes from './pages/Configuracoes';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="configuracoes" element={<Configuracoes />} />
                    <Route path="*" element={<div>Página não encontrada</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;