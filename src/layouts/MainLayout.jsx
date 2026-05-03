import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const MainLayout = () => {
    return <Box><Outlet /></Box>;
};

export default MainLayout;