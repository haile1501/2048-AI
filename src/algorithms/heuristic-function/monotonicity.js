export const monotonicity = board => {
    const directionsEval = {
        up: 0,
        down: 0,
        right: 0,
        left: 0
    }

    // up/down evaluation
    for (let col = 0; col < 4; col++) {
        let prev = 0;
        while (prev < 3) {
            let row = prev + 1;
            for (row = prev + 1; row < 4; row++) {
                if (board[row][col] === 0) {
                    continue;
                } else {
                    break;
                } 
            }

            if (row === 4) {
                row--;
            }
            const prevTile = board[prev][col] !== 0 ? Math.log2(board[prev][col]) : 0;
            const nextTile = board[row][col] !== 0 ? Math.log2(board[row][col]) : 0;

            if (prevTile !== 0 && nextTile !== 0) {
                if (prevTile > nextTile) {
                    directionsEval.up += (nextTile - prevTile);
                } else if (prevTile < nextTile) {
                    directionsEval.down += (prevTile - nextTile);
                }
            }
            prev = row;
        }
    }

    // left/right evaluation
    for (let row = 0; row < 4; row++) {
        let prev = 0;
        while (prev < 3) {
            let col = prev + 1;
            for (col = prev + 1; col < 4; col++) {
                if (board[row][col] === 0) {
                    continue;
                } else {
                    break;
                } 
            }

            if (col === 4) {
                col--;
            }
            const prevTile = board[row][prev] !== 0 ? Math.log2(board[row][prev]) : 0;
            const nextTile = board[row][col] !== 0 ? Math.log2(board[row][col]) : 0;

            if (prevTile !== 0 && nextTile !== 0) {
                if (prevTile > nextTile) {
                    directionsEval.left += (nextTile - prevTile);
                } else if (prevTile < nextTile) {
                    directionsEval.right += (prevTile - nextTile);
                }
            }
            prev = col;
        }
    }

    return Math.max(directionsEval.up, directionsEval.down) + Math.max(directionsEval.left, directionsEval.right);
}