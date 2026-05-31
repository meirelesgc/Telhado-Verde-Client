import React, { useState, useEffect } from 'react';
import { RoofContext } from './RoofContext';

export const RoofProvider = ({ children }) => {
    const [selectedRoofIds, setSelectedRoofIds] = useState(() => {
        const saved = localStorage.getItem('selectedRoofIds');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('selectedRoofIds', JSON.stringify(selectedRoofIds));
    }, [selectedRoofIds]);

    const selectRoof = (id) => {
        setSelectedRoofIds([id]);
    };

    const toggleRoof = (id) => {
        setSelectedRoofIds(prev =>
            prev.includes(id)
                ? prev.filter(rid => rid !== id)
                : [...prev, id]
        );
    };

    const clearSelection = () => {
        setSelectedRoofIds([]);
    };

    return (
        <RoofContext.Provider value={{ selectedRoofIds, selectRoof, toggleRoof, clearSelection }}>
            {children}
        </RoofContext.Provider>
    );
};
