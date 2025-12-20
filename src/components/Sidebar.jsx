import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider } from '@mui/material';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = ({ drawerWidth }) => {
    const menuItems = [
        { text: 'Visão Geral', icon: <DashboardIcon />, path: '/' },
        { text: 'Configurações', icon: <SettingsIcon />, path: '/configuracoes' },
    ];

    return <Drawer
        variant="permanent"
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
                width: drawerWidth - 20,
                boxSizing: 'border-box',
                height: 'fit-content',
                maxHeight: 'calc(100vh - 40px)',
                top: '20px',
                left: '10px',
                borderRadius: '16px',
                border: 'none',
                boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
            },
        }}
    >
        <Toolbar />
        <Divider />
        <List>
            {menuItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                    <ListItemButton
                        component={NavLink}
                        to={item.path}
                        style={({ isActive }) => ({
                            backgroundColor: isActive ? '#e0e0e0' : 'transparent',
                            color: isActive ? '#1976d2' : 'inherit'
                        })}
                    >
                        <ListItemIcon sx={{ color: 'inherit' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    </Drawer>
};

export default Sidebar;