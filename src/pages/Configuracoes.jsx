import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const Configuracoes = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'calc(100vh - 160px)',
            }}
        >
            <Card
                elevation={0}
                sx={{
                    p: 4,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '24px',
                    backgroundColor: 'background.paper',
                    backdropFilter: 'blur(10px)',
                    textAlign: 'center'
                }}
            >
                <CardContent>
                    <Typography variant="h2" color="primary" gutterBottom>
                        Configurações
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Em breve
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Configuracoes;
