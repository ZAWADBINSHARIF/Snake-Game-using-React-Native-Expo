import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Coordinate } from '@/types/types';
import { FOOD } from '@/utilies/common_informations';


const Food = ({ x, y }: Coordinate) => {

    const foodIcons = FOOD.ICONS;
    const [foodIconIndex, setFoodIconIndex] = useState(Math.floor(Math.random() * foodIcons.length));

    useEffect(() => {
        setFoodIconIndex(Math.round(Math.random() * foodIcons.length));
    }, [x, y]);

    return <Text
        style={
            [
                { top: y * FOOD.STEP, left: x * FOOD.STEP }, styles.Food
            ]
        }
    >
        {foodIcons[foodIconIndex]}
    </Text>;

};

export default Food;

const styles = StyleSheet.create({
    Food: {
        fontSize: FOOD.SIZE,
        borderRadius: FOOD.RADIUS,
        position: 'absolute'
    }
});