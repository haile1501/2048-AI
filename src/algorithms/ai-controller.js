export const moveUp = board => {
    let canMove = false;

    for (let col = 0; col <= 3; col++) {
        const colArray = [];
        let partialMove = false;
        for (let row = 0; row <= 3; row++) {
            if (board[row][col] !== 0) {
                colArray.push(board[row][col]);
                if (row !== colArray.length - 1) {
                    partialMove = true;
                    if (!canMove) {
                        canMove = true;
                    }
                }
            }
        }

        for (let i = 0; i < colArray.length - 1; i++) {
            if (colArray[i] === colArray[i + 1]) {
                partialMove = true;
                if (!canMove) {
                    canMove = true;
                }
                colArray[i] += colArray[i + 1];
                colArray.splice(i + 1, 1);
            }
        }

        if (partialMove) {
            for (let i = 0; i < 4; i++) {
                if (colArray[i]) {
                    board[i][col] = colArray[i];
                } else {
                    board[i][col] = 0;
                }
            }
        }
    }

    return canMove;
}

export const moveDown = board => {
    let canMove = false;

    for (let col = 0; col <= 3; col++) {
        const colArray = [];
        let partialMove = false;

        for (let row = 3; row >= 0; row--) {
            if (board[row][col] !== 0) {
                colArray.push(board[row][col]);
                if (3 - row !== colArray.length - 1) {
                    partialMove = true;
                    if (!canMove) {
                        canMove = true;
                    }
                }
            }
        }

        for (let i = 0; i < colArray.length - 1; i++) {
            if (colArray[i] === colArray[i + 1]) {
                partialMove = true;
                if (!canMove) {
                    canMove = true;
                }
                colArray[i] += colArray[i + 1];
                colArray.splice(i + 1, 1);
            }
        }

        if (partialMove) {
            for (let i = 0; i < 4; i++) {
                if (colArray[i]) {
                    board[3 - i][col] = colArray[i];
                } else {
                    board[3 - i][col] = 0;
                }
            }
        }
    }

    return canMove;
}

export const moveLeft = board => {
    let canMove = false;

    for (let row = 0; row <= 3; row++) {
        const rowArray = [];
        let partialMove = false;

        for (let col = 0; col <= 3; col++) {
            if (board[row][col] !== 0) {
                rowArray.push(board[row][col]);
                if (col !== rowArray.length - 1) {
                    partialMove = true;
                    if (!canMove) {
                        canMove = true;
                    }
                }
            }
        }

        for (let i = 0; i < rowArray.length - 1; i++) {
            if (rowArray[i] === rowArray[i + 1]) {
                partialMove = true;
                if (!canMove) {
                    canMove = true;
                }
                rowArray[i] += rowArray[i + 1];
                rowArray.splice(i + 1, 1);
            }
        }

        if (partialMove) {
            for (let i = 0; i < 4; i++) {
                if (rowArray[i]) {
                    board[row][i] = rowArray[i];
                } else {
                    board[row][i] = 0;
                }
            }
        }
    }

    return canMove;
}

export const moveRight = board => {
    let canMove = false;

    for (let row = 0; row <= 3; row++) {
        const rowArray = [];
        let partialMove = false;

        for (let col = 3; col >= 0; col--) {
            if (board[row][col] !== 0) {
                rowArray.push(board[row][col]);
                if (3 - col !== rowArray.length - 1) {
                    partialMove = true;
                    if (!canMove) {
                        canMove = true;
                    }
                }
            }
        }

        for (let i = 0; i < rowArray.length - 1; i++) {
            if (rowArray[i] === rowArray[i + 1]) {
                partialMove = true;
                if (!canMove) {
                    canMove = true;
                }
                rowArray[i] += rowArray[i + 1];
                rowArray.splice(i + 1, 1);
            }
        }

        if (partialMove) {
            for (let i = 0; i < 4; i++) {
                if (rowArray[i]) {
                    board[row][3 - i] = rowArray[i];
                } else {
                    board[row][3 - i] = 0;
                }
            }
        }
    }

    return canMove;
}

export const DIRECTIONS = {
    'ArrowDown': moveDown,
    'ArrowLeft': moveLeft,
    'ArrowUp': moveUp,
    'ArrowRight': moveRight
};
