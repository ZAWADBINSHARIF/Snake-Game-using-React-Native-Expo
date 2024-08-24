import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import useGlobalContext from '@/hooks/useGlobalContext';
import { Colors } from '@/constants/Colors';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const Dashboard = () => {

    const {
        score,
        gameRestart,
        setGameRestart,
        isGamePause,
        setIsGamePause,
        isGameOver } = useGlobalContext();

    console.log(score);

    return (
        <View style={styles.Dashboard}>
            <MaterialCommunityIcons name="reload" size={38} color={Colors.primary} onPress={() => setGameRestart(!gameRestart)} />
            <Text style={styles.Score}>{score} </Text>
            <FontAwesome5 name="pause-circle" size={35} color={Colors.primary} onPress={() => !isGameOver && setIsGamePause(!isGamePause)} />
        </View>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    Dashboard: {
        height: 54,
        marginVertical: 12,
        backgroundColor: Colors.background,
        marginHorizontal: 12,
        borderRadius: 12,
        borderBottomStartRadius: 0,
        borderBottomEndRadius: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    Score: {
        fontSize: 35,
        color: Colors.primary
    }
});