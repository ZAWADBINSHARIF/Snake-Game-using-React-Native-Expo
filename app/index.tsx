import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import Game from '@/components/Game';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Footer from '@/components/Footer';
import Dashboard from '@/components/Dashboard';
import GlobalValueProvider from '@/context/GlobalValueProvider';

const index = () => {

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='dark' />

            <GlobalValueProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <Dashboard />
                    <Game />
                    <Footer />
                </GestureHandlerRootView>
            </GlobalValueProvider>

        </SafeAreaView>
    );
};

export default index;

const styles = StyleSheet.create({
    container: {
        'backgroundColor': Colors.primary,
        flex: 1
    }
});