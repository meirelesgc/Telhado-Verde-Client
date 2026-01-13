import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Configuracoes from './pages/Configuracoes';
import { HashRouter, Routes, Route } from 'react-router-dom'; //

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="configuracoes" element={<Configuracoes />} />
                    <Route path="*" element={<div>Página não encontrada</div>} />
                </Route>
            </Routes>
        </HashRouter>
    );
}

export default App;