import { Typography, Grid, Paper } from '@mui/material';

export default function Dashboard() {
    return (
        <div>
            <Typography variant="h4" gutterBottom>Visão Geral</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>Gráfico de Temperatura</Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>Status da Irrigação</Paper>
                </Grid>
                {/* Adicione muito texto aqui depois para testar o scroll */}
            </Grid>
        </div>
    );
}