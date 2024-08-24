import { Colors } from "@/constants/Colors";

const SNAKE = {
    STEP: 7,
    WIDTH: 30,
    HEIGHT: 30,
    RADIUS: 15,
    COLOR: Colors.primary
};


// 🍟🌭🍿🧇🍖🍗🥩🍤🍣🍥🍦🍧🍨🍩🍪🍰🧁🍫🍬🍭🍡🍮🍯🥛🧃🍌🍍🥭🍎🍏🍓


const FOOD = {
    WIDTH: 40,
    HEIGHT: 40,
    RADIUS: 10,
    BODY: [
        "🍎", "🍕", "🍟", "🌭", "🍿", "🧇", "🍖", "🍗", "🥩",
        "🍤", "🍣", "🍥", "🍦", "🍧", "🍨", "🍩", "🍪", "🍰", "🧁",
        "🍫", "🍬", "🍭", "🍡", "🍮", "🍯", "🥛", "🧃", "🍌", "🍍",
        "🥭", "🍎", "🍏", "🍓"
    ],
    STEP: 7
};

export { SNAKE, FOOD };