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
    SIZE: 32,
    RADIUS: 10,
    ICONS: [
        "🍎", "🍕", "🍟", "🌭", "🍿", "🧇", "🍖", "🍗", "🥩",
        "🍤", "🍣", "🍥", "🍦", "🍧", "🍨", "🍩", "🍪", "🍰", "🧁",
        "🍫", "🍬", "🍭", "🍡", "🍮", "🍯", "🥛", "🧃", "🍌", "🍍",
        "🥭", "🍎", "🍏", "🍓"
    ],
    STEP: 7
};

export { SNAKE, FOOD };