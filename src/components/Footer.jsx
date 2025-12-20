import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box component="footer" sx={{ p: 2, mt: 'auto', textAlign: 'center', bgcolor: '#fff', borderTop: '1px solid #ddd' }}>
            <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} Telhado Verde. Todos os direitos reservados.
            </Typography>
        </Box>
    );
};

export default Footer;