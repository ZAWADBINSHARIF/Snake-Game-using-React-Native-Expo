import { Coordinate } from "@/types/types";
import { FOOD } from "./common_informations";

export default function randomFoodPosition(maxX: number, maxY: number): Coordinate {

    return {
        x: Math.random() * (maxX - FOOD.SIZE / FOOD.STEP),
        y: Math.random() * (maxY - FOOD.SIZE / FOOD.STEP)
    };
}