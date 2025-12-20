import React from 'react';
import { Grid, Card, CardActionArea, CardContent, Stack, Box, Typography } from '@mui/material';

export const SummaryCards = ({ items, activeView, onCardClick }) => {
    const cardStyle = (id) => ({
        height: '100%',
        borderRadius: 4,
        boxShadow: '0px 4px 20px rgba(0,0,0,0.05)',
        border: activeView === id ? '2px solid' : '2px solid transparent',
        borderColor: 'primary.main',
        transition: 'all 0.3s ease',
        bgcolor: 'background.paper'
    });

    return (
        <Grid container spacing={3} sx={{ mb: 4, width: '100%', ml: 0 }}>
            {items.map((item) => (
                <Grid size={{ xs: 12, sm: 4 }} key={item.id} sx={{ p: 1 }}>
                    <Card sx={cardStyle(item.id)}>
                        <CardActionArea onClick={() => onCardClick(item.id)} sx={{ height: '100%' }}>
                            <CardContent>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Box sx={{ p: 1, bgcolor: 'action.hover', borderRadius: 2, display: 'flex' }}>
                                        {item.icon}
                                    </Box>
                                    <Typography variant="h6">{item.label}</Typography>
                                </Stack>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};