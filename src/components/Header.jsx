import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = ({ drawerWidth }) => {
    return <AppBar
        position="fixed"
        sx={{
            width: (theme) => `calc(100% - ${drawerWidth}px - 40px)`,
            ml: `${drawerWidth}px`,
            mt: 2,
            mr: 2,
            borderRadius: (theme) => `${theme.shape.borderRadius}px`,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            color: 'primary.main',
            boxShadow: '0px 4px 20px rgba(0,0,0,0.05)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
    >
        <Toolbar>
            <Typography variant="h6" noWrap component="div">
                Telhado Verde Dashboard
            </Typography>
        </Toolbar>
    </AppBar>
};

export default Header;