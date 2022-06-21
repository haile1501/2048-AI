import { average } from "./average";
import { monotonicity } from "./monotonicity";
import { smoothness } from "./smoothness";
import { snake } from "./snake";
import { possibleMerge } from "./possibleMerge";

const maxValue = board => {
    let max = 0;
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] > max) {
                max = board[row][col];
            }
        }
    }

    return max;
}

const emptyTiles = board => {
    let emptyTilesNumber = 0;
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 0) {
                emptyTilesNumber++;
            }
        }
    }

    return emptyTilesNumber;
}

const combinedHeuristic = board => {
    const monoWeight = 1.0;
    const smoothWeight = 0.1;
    const maxWeight = 1.0;
    const emptyWeight = 2.5;

    return monoWeight * monotonicity(board)
        + smoothWeight * smoothness(board)
        + maxWeight * maxValue(board)
        + emptyWeight * emptyTiles(board);
}

const heuristicFunctions = {
    monotonicity: monotonicity,
    smoothness: smoothness,
    combinedHeuristic: combinedHeuristic
};

export const heuristicFunction = heuristicFunctions.combinedHeuristic;