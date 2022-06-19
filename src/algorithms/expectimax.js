import { DIRECTIONS } from "./ai-controller";

import { heuristicFunction } from "./heuristic-function/heuristic";

const maxMove = (board, maxDepth, currentDepth) => {
    if (currentDepth === maxDepth) {
        return heuristicFunction(board);
    }

    let maxUtility = -99999999;
    let nextMove = null;
    let endGame = true;
    for (let direction of Object.keys(DIRECTIONS)) {
        const newBoard = JSON.parse(JSON.stringify(board));

        if (DIRECTIONS[direction](newBoard)) {
            endGame = false;
            let childUtility = chanceMove(newBoard, maxDepth, currentDepth + 1);

            if (childUtility > maxUtility) {
                maxUtility = childUtility;
                nextMove = direction;
            }
        }
    }

    if (endGame) {
        return heuristicFunction(board);
    }

    return currentDepth === 0 ? nextMove : maxUtility;
}

const chanceMove = (board, maxDepth, currentDepth) => {
    if (currentDepth === maxDepth) {
        return heuristicFunction(board);
    }

    let totalUtility = 0;
    let totalNode = 0;
    for (let row = 0; row <= 3; row++) {
        for (let col = 0; col <= 3; col++) {
            if (board[row][col] === 0) {
                for (let tile of [2, 4]) {
                    totalNode++;
                    board[row][col] = tile;
                    totalUtility += maxMove(board, maxDepth, currentDepth + 1);
                }
                board[row][col] = 0;
            }
        }
    }

    return totalUtility / totalNode;
}

export const expectimax = (board, maxDepth) => {
    
    return maxMove(board, maxDepth, 0);
}