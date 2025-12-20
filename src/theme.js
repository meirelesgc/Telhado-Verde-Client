// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4A9F3C', // Verde Musgo (Telhado)
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#9CD35E', // Verde Folha (Plantas/Lateral)
        },
        background: {
            default: '#F9E7C4', // Creme Areia (Fachada)
            paper: '#ffffff',   // Branco Puro (Janelas)
        },
        text: {
            primary: '#313D3A',   // Grafite Profundo (Contornos)
            secondary: '#4A9F3C',
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: '#4A9F3C',
                    border: '1px solid #4A9F3C',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 600,
                },
            },
        },
    },
});

export default theme;