import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar, CssBaseline } from '@mui/material';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const drawerWidth = 240; // Largura fixa do menu lateral

const MainLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            <CssBaseline />

            {/* Header Fixo */}
            <Header drawerWidth={drawerWidth} />

            {/* Sidebar Fixa */}
            <Sidebar drawerWidth={drawerWidth} />

            {/* Conteúdo Central + Footer */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    height: '100vh',
                    overflow: 'auto', // Permite rolar apenas o conteúdo central
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#f5f5f5' // Cor de fundo suave padrão de dashboards
                }}
            >
                {/* Toolbar necessária para o conteúdo não ficar escondido atrás do Header */}
                <Toolbar />

                {/* Aqui entra o conteúdo dinâmico (Dashboard, Configurações, etc.) */}
                <Box sx={{ flexGrow: 1 }}>
                    <Outlet />
                </Box>
                {/* Footer no final do scroll ou fixo na base do container */}
                <Footer />
            </Box>
        </Box>
    );
};

export default MainLayout;