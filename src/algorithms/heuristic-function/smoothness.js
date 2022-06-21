const LOOK_UP_DIRECTIONS = [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
];
// down and right only

const validPosition = (row, col) => {
    if (row >= 0 && row < 4 && col >= 0 && col < 4) {
        return true;
    }

    return false;
}

const isEmptyTile = (board, row, col) => {
    if (validPosition(row, col)) {
        if (board[row][col] === 0) {
            return true;
        }
    }
    
    return false;
}


const furthestTile = (board, row, col, direction) => {
    
    do {
        row += direction.x;
        col += direction.y;
    } while (row < 4 && col < 4 && isEmptyTile(board, row, col));

    const nextRow = row;
    const nextCol = col;
    return { nextRow, nextCol };
}

export const smoothness = board => {
    let smoothnessVal = 0;

    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] !== 0) {
                for (let direction of LOOK_UP_DIRECTIONS) {
                    const { nextRow, nextCol } = furthestTile(board, row, col, direction);

                    if (!isEmptyTile(nextRow, nextCol) && validPosition(nextRow, nextCol)) {
                        smoothnessVal -= Math.abs(Math.log2(board[nextRow][nextCol]) - Math.log2(board[row][col]));
                    }
                }
            }
        }
    }

    return smoothnessVal;
}