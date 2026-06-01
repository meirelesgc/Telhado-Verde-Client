import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GrassIcon from '@mui/icons-material/Grass';

const Home = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '70vh',
                textAlign: 'center',
                gap: 4
            }}
        >
            <Box>
                <Typography variant="h1" gutterBottom color="primary">
                    Bem-vindo ao Telhado Verde
                </Typography>
                <Typography variant="h2" color="text.secondary">
                    Monitoramento inteligente para cidades sustentáveis.
                </Typography>
            </Box>

            <Box sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    Para começar, selecione um telhado para monitorar.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<GrassIcon />}
                    onClick={() => navigate('/telhados')}
                    sx={{ px: 4, py: 1.5 }}
                >
                    Selecionar Telhado
                </Button>
            </Box>
        </Box>
    );
};

export default Home;
