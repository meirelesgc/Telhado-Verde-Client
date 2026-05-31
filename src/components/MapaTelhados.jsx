import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';

// Import icons to fix Leaflet default icon issues in Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MapaTelhados({ dispositivos, onSelect }) {
    const navigate = useNavigate();
    
    // Default center (Salvador, BA - as suggested or based on data)
    const centroPadrao = dispositivos.length > 0 
        ? [dispositivos[0].latitude, dispositivos[0].longitude]
        : [-12.9714, -38.5014];

    return (
        <Box 
            sx={{ 
                height: '500px', 
                width: '100%', 
                borderRadius: '24px', 
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 8px 32px rgba(0,0,0,0.05)'
            }}
        >
            <MapContainer 
                center={centroPadrao} 
                zoom={13} 
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {dispositivos.map((dispositivo) => (
                    <Marker 
                        key={dispositivo.id} 
                        position={[dispositivo.latitude, dispositivo.longitude]}
                        eventHandlers={{
                            click: () => {
                                // Optional: navigate directly on click
                                // navigate(`/telhados/${dispositivo.id}`);
                            },
                            dblclick: () => {
                                if (onSelect) onSelect(dispositivo.id);
                                navigate(`/telhados/${dispositivo.id}`);
                            }
                        }}
                    >
                        <Popup>
                            <Box sx={{ p: 1, textAlign: 'center' }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                                    {dispositivo.nome}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    Lat: {dispositivo.latitude.toFixed(4)}<br />
                                    Long: {dispositivo.longitude.toFixed(4)}
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    size="small"
                                    fullWidth
                                    onClick={() => {
                                        if (onSelect) onSelect(dispositivo.id);
                                        navigate(`/telhados/${dispositivo.id}`);
                                    }}
                                    sx={{ borderRadius: '8px' }}
                                >
                                    Ver Detalhes
                                </Button>
                            </Box>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </Box>
    );
}
