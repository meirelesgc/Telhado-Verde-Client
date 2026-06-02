import { useState, useEffect, useRef } from 'react';

/**
 * Hook para monitorar a largura de um elemento (container do gráfico)
 * @returns {Object} { ref, width }
 */
export function useChartWidth() {
    const [width, setWidth] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setWidth(entry.contentRect.width);
            }
        });

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return { ref, width };
}

/**
 * Calcula o intervalo ideal para exibir os ticks do eixo X
 * @param {number} containerWidth Largura do container em pixels
 * @param {number} dataLength Total de pontos de dados
 * @param {number} tickWidthPx Largura estimada de cada label em pixels
 * @returns {number|string} Intervalo para a prop 'interval' do XAxis
 */
export function calculateTickInterval(containerWidth, dataLength, tickWidthPx = 80) {
    if (containerWidth === 0 || dataLength === 0) return 'preserveStartEnd';
    
    const maxTicks = Math.floor(containerWidth / tickWidthPx);
    
    if (maxTicks >= dataLength) {
        return 0; // Mostra todos
    }
    
    return Math.ceil(dataLength / maxTicks);
}
