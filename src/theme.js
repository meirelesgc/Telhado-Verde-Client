import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#4A9F3C',
        },
        secondary: {
            main: '#9CD35E',
        },
        background: {
            default: '#E8F5E9',
            paper: '#F6FFF2',
        },
        text: {
            primary: '#21312B',
            secondary: '#4B6357',
        },
        custom: {
            cremeAreia: '#F9E7C4',
            brancoTransparente: 'rgba(255, 255, 255, 0.75)',
            verdeClaro: '#DDF4D7',
            verdeCard: '#F6FFF2',
            verdeEscuro: '#3B7A34',
        },
        divider: 'rgba(74, 159, 60, 0.15)',
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h2: {
            fontWeight: 700,
            fontSize: '1.4rem',
        },
        h3: {
            fontWeight: 600,
            fontSize: '1rem',
        },
    },
    shape: {
        borderRadius: 24,
    },
});

export default theme;