import { useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

function useScreenDimensions() {
    const [screenDimensions, setScreenDimensions] = useState<ScaledSize>(
        Dimensions.get('window')
    );

    useEffect(() => {
        const updateDimensions = ({ window }: { window: ScaledSize; }) => {
            setScreenDimensions(window);
        };

        Dimensions.addEventListener('change', updateDimensions);
    }, []);

    return screenDimensions;
}

export default useScreenDimensions;