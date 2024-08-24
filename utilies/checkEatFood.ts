import { Coordinate } from "@/types/types";
import { FOOD, SNAKE } from "./common_informations";

export default function checkEatFood(
    snakeHead: Coordinate,
    food: Coordinate
): boolean {

    const distanceBetweenFoodAndSnakeX = Math.abs(snakeHead.x - food.x);
    const distanceBetweenFoodAndSnakeY = Math.abs(snakeHead.y - food.y);

    return (distanceBetweenFoodAndSnakeX <= 3 && distanceBetweenFoodAndSnakeY <= 4);
}