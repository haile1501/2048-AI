import { DIRECTIONS } from './ai-controller';

import { heuristicFunction } from './heuristic-function/heuristic';

const maxMove = (board, maxDepth, currentDepth, alpha, beta) => {
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
            let childUtility = minMove(newBoard, maxDepth, currentDepth + 1);
            if (childUtility > maxUtility) {
                maxUtility = childUtility;
                alpha = Math.max(alpha, maxUtility);

                if (beta <= alpha) {
                    return maxUtility;
                }
                nextMove = direction;
            }
        }
    }

    if (endGame) {
        return heuristicFunction(board);
    }

    return currentDepth === 0 ? nextMove : maxUtility;
}

const minMove = (board, maxDepth, currentDepth, alpha, beta) => {
    if (currentDepth === maxDepth) {
        return heuristicFunction(board);
    }

    let minUtility = 99999999;
    for (let row = 0; row <= 3; row++) {
        for (let col = 0; col <= 3; col++) {
            if (board[row][col] === 0) {
                for (let tile of [2, 4]) {
                    board[row][col] = tile;
                    let childUtility = maxMove(board, maxDepth, currentDepth + 1);
                    if (childUtility < minUtility) {
                        minUtility = childUtility;
                        beta = Math.min(beta, minUtility);

                        if (beta <= alpha) {
                            board[row][col] = 0;
                            return minUtility;
                        }
                    }
                }
                board[row][col] = 0;
            }
        }
    }

    return minUtility;
}

export const minimax = (board, maxDepth) => {

    return maxMove(board, maxDepth, 0, -99999999, 99999999);
}

/**
 * utility = sum of all numbers/ number of non-empty
 */