import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';

const Footer = () => {
    return (
        <View style={styles.Footer}>
            <Text>Footer</Text>
        </View>
    );
};

export default Footer;

const styles = StyleSheet.create({
    Footer: {
        height: 54,
        backgroundColor: Colors.background,
        marginVertical: 12,
        marginHorizontal: 12,
        borderRadius: 12,
        borderTopStartRadius: 0,
        borderTopEndRadius: 0,
    }
});