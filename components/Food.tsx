import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Coordinate } from '@/types/types';
import { FOOD } from '@/utilies/common_informations';


const Food = ({ x, y }: Coordinate) => {

    return <Text
        style={
            [
                { top: y * FOOD.STEP, left: x * FOOD.STEP }, styles.Food
            ]
        }
    >🍎</Text>;

};

export default Food;

const styles = StyleSheet.create({
    Food: {
        fontSize: FOOD.SIZE,
        borderRadius: FOOD.RADIUS,
        position: 'absolute'
    }
});