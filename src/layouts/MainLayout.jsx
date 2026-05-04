import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    Box,
    BottomNavigation,
    BottomNavigationAction,
    Paper
} from '@mui/material';

const MainLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Box
            sx={{
                pb: 10,
                minHeight: '100vh',
                background: 'linear-gradient(180deg, #DDF4D7 0%, #F4FFF1 100%)'
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
                    backgroundColor: 'custom.brancoTransparente'
                }}
            >
                <BottomNavigation
                    showLabels
                    value={location.pathname}
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
                    <BottomNavigationAction disableRipple label="Tela inicial" value="/" />
                    <BottomNavigationAction disableRipple label="Métricas" value="/metricas" />
                </BottomNavigation>
            </Paper>
        </Box>
    );
};

export default MainLayout;