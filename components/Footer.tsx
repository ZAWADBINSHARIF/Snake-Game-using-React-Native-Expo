import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import useGlobalContext from '@/hooks/useGlobalContext';

const Footer = () => {

    const {
        gameRestart,
        isGamePause,
        isGameOver,
        ateFood,
        setAteFood,
        setScore,
        SCORE_INCREMENT } = useGlobalContext();
    const increaseProgressNumber = 10;
    const [progress, setProgress] = useState<number>(0);



    useEffect(() => {
        setProgress(0);
    }, [gameRestart]);

    useEffect(() => {
        if (progress === 100 || ateFood) {
            setProgress(0);
            setAteFood(false);
            progress === 100 && setScore(prev => prev - (SCORE_INCREMENT + 5));
        }
    }, [progress, ateFood]);

    useEffect(() => {
        if (!isGameOver && !isGamePause) {
            const interval_Id = setInterval(() => {
                setProgress(prev => prev += increaseProgressNumber);
            }, 1000);

            return () => clearInterval(interval_Id);
        }

    }, [isGameOver, isGamePause]);

    const styles = StyleSheet.create({
        Footer: {
            height: 54,
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: Colors.background,
            marginVertical: 12,
            marginHorizontal: 12,
            borderRadius: 12,
            borderTopStartRadius: 0,
            borderTopEndRadius: 0,
        },
        BarView: {
            height: 35,
            width: "80%",
            backgroundColor: Colors.primary,
            borderRadius: 18,
            borderWidth: 2,
            borderColor: Colors.primary,
            overflow: 'hidden'
        },
        ProgressBar: {
            height: "100%",
            width: `${progress}%`,
            backgroundColor: Colors.tertiary
        }
    });

    return (
        <View style={styles.Footer}>
            <View style={styles.BarView}>
                <View style={styles.ProgressBar} />
            </View>
        </View>
    );
};

export default Footer;
