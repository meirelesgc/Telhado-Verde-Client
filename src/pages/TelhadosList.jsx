import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActionArea,
    CircularProgress,
} from '@mui/material';
import GrassIcon from '@mui/icons-material/Grass';
import { useDispositivos } from '../hooks/useDispositivos';
import { useRoofs } from '../hooks/useRoofs';
import MapaTelhados from '../components/MapaTelhados';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TelhadosList = () => {
    const navigate = useNavigate();
    const { data: dispositivos = [], isLoading } = useDispositivos();
    const { selectRoof } = useRoofs();

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                <CircularProgress color="primary" />
            </Box>
        );
    }

    const handleSelect = (id) => {
        selectRoof(id);
        navigate(`/telhados/${id}`);
    };

    return (
        <Box sx={{ pb: 4 }}>
            <Typography variant="h1" sx={{ mb: 4, textAlign: 'center' }}>
                Monitoramento de Telhados
            </Typography>

            {/* Carrossel de Dispositivos */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h2" sx={{ mb: 2 }}>
                    Seus Telhados
                </Typography>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        960: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                    style={{ padding: '10px 0 40px 0' }}
                >
                    {dispositivos.map((telhado) => (
                        <SwiperSlide key={telhado.id}>
                            <Card
                                elevation={0}
                                sx={{
                                    borderRadius: '24px',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 12px 24px -10px rgba(0,0,0,0.1)',
                                        borderColor: 'primary.main',
                                    }
                                }}
                            >
                                <CardActionArea
                                    onClick={() => handleSelect(telhado.id)}
                                    sx={{ p: 1 }}
                                >
                                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                mb: 1,
                                                color: 'primary.main'
                                            }}
                                        >
                                            <GrassIcon sx={{ fontSize: 40 }} />
                                        </Box>
                                        <Typography variant="h3" noWrap gutterBottom>
                                            {telhado.nome}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ID: {telhado.id}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>

            {/* Mapa de Dispositivos */}
            <Box>
                <Typography variant="h2" sx={{ mb: 2 }}>
                    Localização Global
                </Typography>
                <MapaTelhados
                    dispositivos={dispositivos}
                    onSelect={selectRoof}
                />
            </Box>

            {dispositivos.length === 0 && (
                <Box sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
                    <Typography color="text.secondary">
                        Nenhum telhado encontrado.
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default TelhadosList;
