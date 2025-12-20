import React from 'react';
import { List, ListItem, ListItemText, Stack, Typography, Box, Divider } from '@mui/material';
import MemoryIcon from '@mui/icons-material/Memory';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const DeviceStatusList = ({ dispositivos, sensores }) => {
    return (
        <List>
            {dispositivos?.map((disp) => (
                <React.Fragment key={disp.id_dispositivo}>
                    <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                        <ListItemText
                            primary={
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <MemoryIcon fontSize="small" color="action" />
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                        {disp.nome}
                                    </Typography>
                                </Stack>
                            }
                            secondary={
                                <Box sx={{ mt: 1 }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <LocationOnIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                        Lat: {disp.latitude} / Long: {disp.longitude}
                                    </Typography>
                                    <Typography variant="body2" color="primary">
                                        {/* Lógica para filtrar sensores que pertencem a este dispositivo */}
                                        Sensores: {sensores
                                            ?.filter(s => s.id_dispositivo === disp.id_dispositivo)
                                            .map(s => s.tipo)
                                            .join(', ') || 'Nenhum sensor detectado'}
                                    </Typography>
                                </Box>
                            }
                        />
                    </ListItem>
                    <Divider component="li" />
                </React.Fragment>
            ))}
        </List>
    );
};