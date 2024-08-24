import { View, Text } from 'react-native';
import React, { createContext, useState } from 'react';


export interface GlobalValue {
    score: number,
    setScore: React.Dispatch<React.SetStateAction<number>>,
    isGamePause: boolean,
    setIsGamePause: React.Dispatch<React.SetStateAction<boolean>>,
    gameRestart: boolean,
    setGameRestart: React.Dispatch<React.SetStateAction<boolean>>;
    isGameOver: boolean,
    setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
    ateFood: boolean,
    setAteFood: React.Dispatch<React.SetStateAction<boolean>>;
    SCORE_INCREMENT: number;
}

export const GlobalValueContext = createContext<GlobalValue | null>(null);

const GlobalValueProvider = ({ children }: { children: React.ReactNode; }) => {

    const [score, setScore] = useState<number>(0);
    const [isGamePause, setIsGamePause] = useState<boolean>(false);
    const [gameRestart, setGameRestart] = useState<boolean>(false);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [ateFood, setAteFood] = useState<boolean>(true);
    const SCORE_INCREMENT = 5;


    return (
        <GlobalValueContext.Provider
            value={{
                score,
                setScore,
                isGamePause,
                setIsGamePause,
                gameRestart,
                setGameRestart,
                isGameOver,
                setIsGameOver,
                ateFood,
                setAteFood,
                SCORE_INCREMENT
            }}>

            {children}

        </GlobalValueContext.Provider>
    );
};

export default GlobalValueProvider;