import { useContext } from 'react';
import { RoofContext } from '../context/RoofContext';

export function useRoofs() {
    const context = useContext(RoofContext);
    if (!context) {
        throw new Error('useRoofs must be used within a RoofProvider');
    }
    return context;
}
