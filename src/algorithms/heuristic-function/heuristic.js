import { average } from "./average";
import { monotonicity } from "./monotonicity";
import { smoothness } from "./smoothness";
// import { snake } from "./snake";
import { possibleMerge } from "./possibleMerge";


const weightedMatrix = [[4, 3, 2, 1],
                        [5, 6, 7, 8],
                        [12, 11, 10, 9],
                        [100, 300, 600, 1200]];


const calculateBoard = board => {
    let result = 0;
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] !== 0) {
                result += weightedMatrix[row][col] * board[row][col];
            }
        }
    }

    return result;
}

const maxValue = board => {
    let max = 0;
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] > max) {
                max = board[row][col];
            }
        }
    }

    return Math.log2(max);
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

const maxTileAtCorner = board => {
    let max = 0;
    let maxRow = 0;
    let maxCol = 0;
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] > max) {
                max = board[row][col];
                maxRow = row;
                maxCol = col;
            }
        }


        if ((maxRow === 3 && maxCol === 3) || (maxRow === 3 && maxCol === 0) || (maxRow === 0 && maxCol === 3) || (maxRow === 0 && maxCol === 0)) {
            return Math.log2(max);
        }

        return Math.log2(max) * -1;
    }
}

const combinedHeuristic = board => {
    const monoWeight = 1.0;
    const smoothWeight = 0.1;
    //const maxWeight = 1.0;
    const emptyWeight = 2.75;
    const maxTileCornerWeight = 1.5;
    const possibleWeight = 1.0;
    //const averageWeight = 15;

    //return 
    return  monotonicity(board) * monoWeight
        + smoothWeight * smoothness(board)
        + maxTileCornerWeight * maxTileAtCorner(board)
        + emptyWeight * emptyTiles(board)
        //+ maxWeight * maxValue(board)
        //+ monoWeight * monotonicity(board)
        + possibleWeight * possibleMerge(board)
        //+ averageWeight * average(board);
}

const heuristicFunctions = {
    monotonicity: monotonicity,
    smoothness: smoothness,
    combinedHeuristic: combinedHeuristic
};

export const heuristicFunction = heuristicFunctions.combinedHeuristic;