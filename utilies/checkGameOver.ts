import { Coordinate } from "@/types/types";
import { SNAKE } from "./common_informations";

export default function checkGameOver(
    snakeHead: Coordinate,
    boundaries: {
        xMin: number;
        yMin: number;
        xMax: number;
        yMax: number;
    }): boolean {

    return (
        snakeHead.x + SNAKE.WIDTH / SNAKE.STEP > boundaries.xMax ||
        snakeHead.x < boundaries.xMin ||
        snakeHead.y + SNAKE.HEIGHT / SNAKE.STEP > boundaries.yMax ||
        snakeHead.y < boundaries.yMin
    );
}