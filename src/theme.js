// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        background: {
            default: '#E3F2FD',
            paper: '#ffffff',
        },
    },
    shape: {
        borderRadius: 16,
    },
    shadows: [
        ...createTheme().shadows,
        '0px 4px 20px rgba(0,0,0,0.05)',
    ],
    components: {
    }
});

export default theme;