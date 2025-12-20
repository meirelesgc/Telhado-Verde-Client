import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = ({ drawerWidth }) => {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: `calc(100% - ${drawerWidth}px)`,
                ml: `${drawerWidth}px`,
                // Se quiser que o header cubra o menu, remova as linhas acima e adicione zIndex: (theme) => theme.zIndex.drawer + 1
            }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Telhado Verde Dashboard
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;