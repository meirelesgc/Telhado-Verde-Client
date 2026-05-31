import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home'
import TelhadosList from './pages/TelhadosList'
import Telhados from './pages/Telhados'
import Configuracoes from './pages/Configuracoes'
import { RoofProvider } from './context/RoofProvider';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RoofProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<Home />} />
                            <Route path="telhados" element={<TelhadosList />} />
                            <Route path="telhados/:id" element={<Telhados />} />
                            <Route path="configuracoes" element={<Configuracoes />} />
                            <Route path="*" element={<div>Página não encontrada</div>} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </RoofProvider>
        </ThemeProvider>
    );
}

export default App;