import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return <Box
        component="footer"
        sx={{
            p: 2,
            mb: 2,
            mx: 2,
            mt: 'auto',
            textAlign: 'center',
            bgcolor: 'background.paper',
            borderRadius: (theme) => `${theme.shape.borderRadius}px`,
            boxShadow: '0px -2px 15px rgba(0,0,0,0.05)',
        }}
    >
        <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Telhado Verde. Todos os direitos reservados.
        </Typography>
    </Box>
};

export default Footer;