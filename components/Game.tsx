import { StyleSheet, Text, View, LayoutChangeEvent } from 'react-native';
import React, { useEffect, useState } from 'react';
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
import useGlobalContext from '@/hooks/useGlobalContext';
import useStoreData from '@/hooks/useStoreData';
import { Audio } from 'expo-av';


const Game = () => {

    const [bgSound, setBgSound] = useState<Audio.Sound>();
    const [eatSound, setEatSound] = useState<Audio.Sound>();
    const [gameOverSound, setGameOverSound] = useState<Audio.Sound>();


    const { height: windowHeight, width: windowWidth } = useScreenDimensions();
    const { getItem, setItem } = useStoreData();
    const [best_Score, setBest_Score] = useState<number>(0);
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
        xMax: gameDimension.width / SNAKE.STEP,
        yMax: gameDimension.height / SNAKE.STEP
    };
    const MOVE_INTERVAL = 100;

    const [direction, setDirection] = useState<Direction>(Direction.DOWN);
    const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
    const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);

    const { score,
        setScore,
        gameRestart,
        isGamePause,
        setIsGamePause,
        setGameRestart,
        isGameOver,
        setIsGameOver,
        setAteFood,
        SCORE_INCREMENT } = useGlobalContext();

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
    };

    const moveSnake = async () => {

        const snakeHead = snake[0];
        const newHead = { ...snakeHead };

        if (checkGameOver(snakeHead, GAME_BOUNDS) || score === -50) {
            const savedBestScore = await getItem('best_score');

            gameOverSound?.playAsync();

            if (!savedBestScore) {
                setItem('best_score', score.toString());
                setBest_Score(score);
            } else {
                if (score >= parseInt(savedBestScore)) {
                    setItem('best_score', score.toString());
                    setBest_Score(score);
                } else {
                    setBest_Score(parseInt(savedBestScore));
                }
            }

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
            setAteFood(true);
            eatSound?.stopAsync();
            eatSound?.playAsync();
            return;
        }

        setSnake([newHead, ...snake.slice(0, -1)]);
    };


    useEffect(() => {

        if (gameRestart) {
            setSnake(SNAKE_INITIAL_POSITION);
            setFood(FOOD_INITIAL_POSITION);
            setScore(0);
            setIsGameOver(false);
            setIsGamePause(false);
            setDirection(Direction.DOWN);
            setGameRestart(false);
        }

    }, [gameRestart]);

    useEffect(() => {

        if (isGameOver) {
            bgSound?.stopAsync();
        }

    }, [isGameOver, bgSound]);

    useEffect(() => {

        if (!isGameOver) {
            const intervalID = setInterval(() => {
                !isGamePause && moveSnake();
            }, MOVE_INTERVAL);

            return () => clearInterval(intervalID);
        }
    }, [snake, isGameOver, isGamePause]);

    useEffect(() => {

        const loadSoundAssets = async () => {
            let { sound: bg_sound } = await Audio.Sound.createAsync(require('@/assets/sound/bg_music.mp3'),
                {
                    isLooping: true,
                    volume: 0.4,
                    shouldPlay: true
                }
            );
            setBgSound(bg_sound);

            let { sound: eat_sound } = await Audio.Sound.createAsync(require('@/assets/sound/eat.mp3'));
            setEatSound(eat_sound);

            let { sound: game_over_sound } = await Audio.Sound.createAsync(require('@/assets/sound/game_over.mp3'), {
                volume: 0.4
            });
            setGameOverSound(game_over_sound);

        };

        loadSoundAssets();

    }, []);

    // ** STYLES
    const styles = StyleSheet.create({
        gameContainer: {
            flex: 1,
            'backgroundColor': Colors.background,
            marginHorizontal: GAME_VIEW_MARGIN_HORIZONTAL,
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
                {/*<Text>{FOOD.ICONS}</Text>*/}
                <Food x={food.x} y={food.y} />
                <Snake snake={snake} />
                {isGamePause &&
                    <Text style={{ fontSize: 56, color: Colors.primary }}>Game Pause </Text>

                }
                {!isGamePause && isGameOver &&
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 56, color: Colors.primary }}>
                            Game Over {" "}
                        </Text>
                        <Text style={{ fontSize: 26, color: Colors.primary }}>
                            Score: {score + " "}
                        </Text>
                        <Text style={{ fontSize: 26, color: Colors.primary }}>
                            Best score: {best_Score + " "}
                        </Text>
                    </View>
                }
            </View>
        </PanGestureHandler>
    );
};

export default Game;