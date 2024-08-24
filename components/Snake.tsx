import { StyleSheet, Text, View } from 'react-native';
import React, { Fragment } from 'react';
import { Coordinate } from '@/types/types';
import { Colors } from '@/constants/Colors';
import { SNAKE } from '@/utilies/common_informations';


interface Props {
    snake: Coordinate[];
}

const Snake = ({ snake }: Props) => {
    return (
        <Fragment>
            {
                snake.map((item, index) => {
                    const itemStyle = {
                        left: item.x * SNAKE.STEP,
                        top: item.y * SNAKE.STEP
                    };
                    return <View key={index} style={[styles.Snake, itemStyle]} />;
                }
                )
            }
        </Fragment>
    );
};

export default Snake;

const styles = StyleSheet.create({
    Snake: {
        width: SNAKE.WIDTH,
        height: SNAKE.HEIGHT,
        borderRadius: SNAKE.RADIUS,
        backgroundColor: SNAKE.COLOR,
        position: 'absolute',
    }
});