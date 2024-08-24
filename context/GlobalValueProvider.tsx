import { View, Text } from 'react-native';
import React, { createContext, useState } from 'react';


export interface GlobalValue {
    score: number,
    setScore: React.Dispatch<React.SetStateAction<number>>,
    isGamePause: boolean,
    setIsGamePause: React.Dispatch<React.SetStateAction<boolean>>,
    gameRestart: boolean,
    setGameRestart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalValueContext = createContext<GlobalValue>({
    score: 0,
    setScore: () => 0,
    isGamePause: false,
    setIsGamePause: () => false,
    gameRestart: false,
    setGameRestart: () => false
});

const GlobalValueProvider = ({ children }: { children: React.ReactNode; }) => {

    const [score, setScore] = useState<number>(0);
    const [isGamePause, setIsGamePause] = useState<boolean>(false);
    const [gameRestart, setGameRestart] = useState<boolean>(false);

    return (
        <GlobalValueContext.Provider
            value={{
                score,
                setScore,
                isGamePause,
                setIsGamePause,
                gameRestart,
                setGameRestart
            }}>

            {children}

        </GlobalValueContext.Provider>
    );
};

export default GlobalValueProvider;