export const average = board => {
    let sum = 0;
    let numberedTiles = 0;

    for (let row = 0; row <= 3; row++) {
        for (let col = 0; col <= 3; col++) {
            if (board[row][col] !== 0) {
                sum += board[row][col];
                numberedTiles++;
            }
        }
    }

    return sum / numberedTiles;
}