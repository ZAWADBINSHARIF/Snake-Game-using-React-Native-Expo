import { Coordinate } from "@/types/types";
import { FOOD } from "./common_informations";

export default function randomFoodPosition(maxX: number, maxY: number): Coordinate {

    // maxX = maxX + FOOD.WIDTH / FOOD.STEP;
    // maxY = maxY + FOOD.HEIGHT / FOOD.STEP;

    return {
        x: Math.random() * (maxX - FOOD.SIZE / FOOD.STEP),
        y: Math.random() * (maxY - FOOD.SIZE / FOOD.STEP)
    };
}