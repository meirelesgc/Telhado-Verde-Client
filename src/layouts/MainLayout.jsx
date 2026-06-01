import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    Box,
    BottomNavigation,
    BottomNavigationAction,
    Paper
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GrassIcon from '@mui/icons-material/Grass';
import SettingsIcon from '@mui/icons-material/Settings';

const MainLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getNavValue = () => {
        if (location.pathname === '/') return '/';
        if (location.pathname.startsWith('/telhados')) return '/telhados';
        if (location.pathname.startsWith('/configuracoes')) return '/configuracoes';
        return location.pathname;
    };

    return (
        <Box
            sx={{
                pb: 10,
                minHeight: '100vh',
                backgroundColor: 'background.default'
            }}
        >
            <Box
                sx={{
                    px: { xs: 2, md: 4 },
                    pt: { xs: 2, md: 4 },
                }}
            >
                <Outlet />
            </Box>

            <Paper
                elevation={0}
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    left: 16,
                    right: 16,
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '28px',
                    backdropFilter: 'blur(14px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                }}
            >
                <BottomNavigation
                    showLabels
                    value={getNavValue()}
                    onChange={(event, newValue) => {
                        navigate(newValue);
                    }}
                    sx={{
                        backgroundColor: 'transparent',
                        height: 72,
                        '& .MuiBottomNavigationAction-root': {
                            color: 'text.secondary',
                            minWidth: 'auto',
                        },
                        '& .Mui-selected': {
                            color: 'primary.main',
                            fontWeight: 700,
                        }
                    }}
                >
                    <BottomNavigationAction
                        disableRipple
                        label="Tela inicial"
                        value="/"
                        icon={<HomeIcon />}
                    />
                    <BottomNavigationAction
                        disableRipple
                        label="Telhados"
                        value="/telhados"
                        icon={<GrassIcon />}
                    />
                    <BottomNavigationAction
                        disableRipple
                        label="Configurações"
                        value="/configuracoes"
                        icon={<SettingsIcon />}
                    />
                </BottomNavigation>
            </Paper>
        </Box>
    );
};

export default MainLayout;