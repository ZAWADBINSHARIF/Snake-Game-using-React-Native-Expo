import { StyleSheet, Text, View, Dimensions, LayoutChangeEvent } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { GestureEvent, PanGestureHandler, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import useScreenDimensions from '@/hooks/useScreenDimensions';
import { Coordinate, Direction } from '@/types/types';
import { Colors } from '@/constants/Colors';
import Snake from './Snake';
import checkGameOver from '@/utilies/checkGameOver';
import { SNAKE } from '@/utilies/common_informations';
import Food from './Food';
import checkEatFood from '@/utilies/checkEatFood';
import randomFoodPosition from '@/utilies/randomFoodPosition';
import GlobalValueProvider, { GlobalValue, GlobalValueContext } from '@/context/GlobalValueProvider';
import useGlobalContext from '@/hooks/useGlobalContext';


const Game = () => {

    const { height: windowHeight, width: windowWidth } = useScreenDimensions();
    const [gameDimension, setGameDimension] = useState<{ height: number, width: number; }>({
        height: windowHeight,
        width: windowWidth
    });
    const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
    const FOOD_INITIAL_POSITION = { x: 5, y: 25 };
    const GAME_VIEW_MARGIN_HORIZONTAL = 12;
    const GAME_BOUNDS = {
        xMin: 0,
        yMin: 0,
        xMax: (gameDimension.width) / SNAKE.STEP,
        yMax: gameDimension.height / SNAKE.STEP
    };
    const MOVE_INTERVAL = 100;
    const SCORE_INCREMENT = 5;

    const [direction, setDirection] = useState<Direction>(Direction.DOWN);
    const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
    const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);

    const { setScore, gameRestart, isGamePause, setIsGamePause } = useGlobalContext();

    const handleLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setGameDimension({ width, height });
    };

    const handleGesture = (event: GestureEvent<PanGestureHandlerEventPayload>) => {

        const { translationX, translationY } = event.nativeEvent;

        if (Math.abs(translationX) > Math.abs(translationY)) {

            // Moving X axios

            if (translationX > 0) {
                // Moving right
                setDirection(Direction.RIGHT);
            } else {
                // Moving left
                setDirection(Direction.LEFT);
            }

        } else {
            // Moving Y axios

            if (translationY > 0) {
                // Moving down
                setDirection(Direction.DOWN);
            } else {
                // Moving up
                setDirection(Direction.UP);
            }

        }

        // console.log(translationX, translationY);
    };

    const moveSnake = () => {

        const snakeHead = snake[0];
        const newHead = { ...snakeHead };

        if (checkGameOver(snakeHead, GAME_BOUNDS)) {
            setIsGameOver(prev => !prev);
            return;
        }


        switch (direction) {
            case Direction.UP:
                newHead.y -= 1;
                break;
            case Direction.RIGHT:
                newHead.x += 1;
                break;
            case Direction.DOWN:
                newHead.y += 1;
                break;
            case Direction.LEFT:
                newHead.x -= 1;
                break;
        }

        if (checkEatFood(snakeHead, food)) {
            setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
            setScore(prev => prev += SCORE_INCREMENT);
            setSnake([newHead, ...snake]);
            return;

        }

        setSnake([newHead, ...snake.slice(0, -1)]);
    };



    useEffect(() => {

        if (!isGameOver) {
            const intervalID = setInterval(() => {
                !isGamePause && moveSnake();
            }, MOVE_INTERVAL);

            return () => clearInterval(intervalID);
        }
    }, [snake, isGameOver, isGamePause]);

    // ** STYLES
    const styles = StyleSheet.create({
        gameContainer: {
            flex: 1,
            'backgroundColor': Colors.background,
            marginHorizontal: GAME_VIEW_MARGIN_HORIZONTAL,
            borderRadius: 12,
            borderTopStartRadius: 0,
            borderTopEndRadius: 0,
            justifyContent: 'center',
            alignItems: 'center'
        }
    });

    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <View
                onLayout={handleLayout}
                style={styles.gameContainer}
            >
                {isGamePause && <Text style={{ fontSize: 56, color: '#3f3f3f8a' }}>Game pause</Text>}
                <Food x={food.x} y={food.y} />
                <Snake snake={snake} />
            </View>
        </PanGestureHandler>
    );
};

export default Game;