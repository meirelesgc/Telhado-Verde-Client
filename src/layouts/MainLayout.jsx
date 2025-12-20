import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar, CssBaseline } from '@mui/material';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const drawerWidth = 240;

const MainLayout = () => {
    return (
        <Box sx={{
            display: 'flex',
            height: '100vh',
            overflow: 'hidden',
            p: 2,
            bgcolor: 'background.default'
        }}>
            <CssBaseline />
            <Header drawerWidth={drawerWidth} />
            <Sidebar drawerWidth={drawerWidth} />

            <Box component="main" sx={{
                flexGrow: 1,
                p: 3,
                height: '100vh',
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}>
                <Toolbar />
                <Box sx={{ flexGrow: 1 }}>
                    <Outlet />
                </Box>
                <Footer />
            </Box>
        </Box>
    );
};

export default MainLayout;