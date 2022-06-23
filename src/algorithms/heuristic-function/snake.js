// export const snake = board => {
//     let evaluation = 0;

//     // left/right evaluation
//     let leftEval = false;
//     for (let row = 0; row < 4; row++) {
//         let prev = 0;
//         while (prev < 3) {
//             let col = prev + 1;
//             for (col = prev + 1; col < 4; col++) {
//                 if (board[row][col] === 0) {
//                     continue;
//                 } else {
//                     break;
//                 }
//             }

//             if (col === 4) {
//                 col--;
//             }

//             const prevTile = board[row][prev] !== 0 ? Math.log2(board[row][prev]) : 0;
//             const nextTile = board[row][col] !== 0 ? Math.log2(board[row][col]) : 0;

//             if (leftEval && prevTile < nextTile) {
//                 evaluation += prevTile - nextTile;
//             } else if (!leftEval && prevTile > nextTile) {
//                 evaluation += prevTile - nextTile;
//             }

//             prev = col;
//         }

//         leftEval = !leftEval;
//     }

//     // down evaluation
//     for (let col = 0; col < 4; col++) {
//         let prev = 0;

//         while (prev < 3) {
//             let row = prev + 1;
//             for (row = prev + 1; row < 4; row++) {
//                 if (board[row][col] === 0) {
//                     continue;
//                 } else {
//                     break;
//                 }
//             }

//             if (row === 4) {
//                 row--;
//             }
//             const prevTile = board[prev][col] !== 0 ? Math.log2(board[prev][col]) : 0;
//             const nextTile = board[row][col] !== 0 ? Math.log2(board[row][col]) : 0;
            
//             if (prevTile > nextTile) {
//                 evaluation += nextTile - prevTile;
//             }
            
//             prev = row;
//         }
//     }

//     return evaluation;
// }

const validPosition = (row, col) => {
    if (row >= 0 && row < 4 && col >= 0 && col < 4) {
        return true;
    }

    return false;
}


// export const snake = board => {
//     let evaluation = [0, 0, 0, 0, 0, 0, 0, 0];

//     for (let row = 0; row < 4; row++) {
//         if (row % 2 === 0) {
//             for (let col = 0; col < 4; col++) {
//                 let nextRow = 0;
//                 let nextCol = 0;
//                 if (col === 3 && row < 3) {
//                     nextRow = row + 1;
//                     nextCol = col;
//                 } else {
//                     nextCol = col + 1;
//                     nextRow = row;
//                 }

//                 if (validPosition(nextRow, nextCol)) {
//                     if (board[nextRow][nextCol] < board[row][col]) {
//                         evaluation[0] -= Math.abs(Math.log2(board[nextRow][nextCol] - Math.log2(board[row][col])));
//                     }
//                 }
//             }
//         } else {
//             for (let col = 3; col >= 0; col--) {
//                 let nextRow = 0;
//                 let nextCol = 0;
//                 if (col === 0 && row < 3) {
//                     nextCol = col;
//                     nextRow = row + 1;
//                 } else {
//                     nextCol = col - 1;
//                     nextRow = row;
//                 }

//                 if (validPosition(nextRow, nextCol)) {
//                     if (board[nextRow][nextCol] < board[row][col]) {
//                         evaluation[0] -= Math.abs(Math.log2(board[nextRow][nextCol] - Math.log2(board[row][col])));
//                     }
//                 }
//             }
//         }
//     }

//     // for (let row = 0; row < 4; row++) {
//     //     if (row % 2 !== 0) {
//     //         for (let col = 0; col < 4; col++) {
//     //             let nextRow = 0;
//     //             let nextCol = 0;
//     //             if (col === 3 && row < 3) {
//     //                 nextRow = row + 1;
//     //                 nextCol = col;
//     //             } else {
//     //                 nextCol = col + 1;
//     //                 nextRow = row;
//     //             }

//     //             if (validPosition(nextRow, nextCol)) {
//     //                 if (board[nextRow][nextCol] < board[row][col]) {
//     //                     evaluation[1] -= Math.abs(Math.log2(board[nextRow][nextCol] - Math.log2(board[row][col])));
//     //                 }
//     //             }
//     //         }
//     //     } else {
//     //         for (let col = 3; col >= 0; col--) {
//     //             let nextRow = 0;
//     //             let nextCol = 0;
//     //             if (col === 0 && row < 3) {
//     //                 nextCol = col;
//     //                 nextRow = row + 1;
//     //             } else {
//     //                 nextCol = col - 1;
//     //                 nextRow = row;
//     //             }

//     //             if (validPosition(nextRow, nextCol)) {
//     //                 if (board[nextRow][nextCol] < board[row][col]) {
//     //                     evaluation[1] -= Math.abs(Math.log2(board[nextRow][nextCol] - Math.log2(board[row][col])));
//     //                 }
//     //             }
//     //         }
//     //     }
//     // }

//     // for (let row = 3; row >=0; row--) {
//     //     if (row % 2 === 0) {
//     //         for (let col = 0; col < 4; col++) {
//     //             let nextRow = 0;
//     //             let nextCol = 0;
//     //             if (col === 3 && row > 0) {
//     //                 nextRow = row - 1;
//     //                 nextCol = col;
//     //             } else {
//     //                 nextCol = col + 1;
//     //                 nextRow = row;
//     //             }

//     //             if (validPosition(nextRow, nextCol)) {
//     //                 if (board[nextRow][nextCol] < board[row][col]) {
//     //                     evaluation[2] -= Math.abs(Math.log2(board[nextRow][nextCol] - Math.log2(board[row][col])));
//     //                 }
//     //             }
//     //         }
//     //     } else {
//     //         for (let col = 3; col >= 0; col--) {
//     //             let nextRow = 0;
//     //             let nextCol = 0;
//     //             if (col === 0 && row > 0) {
//     //                 nextCol = col;
//     //                 nextRow = row - 1;
//     //             } else {
//     //                 nextCol = col - 1;
//     //                 nextRow = row;
//     //             }

//     //             if (validPosition(nextRow, nextCol)) {
//     //                 if (board[nextRow][nextCol] < board[row][col]) {
//     //                     evaluation[2] -= Math.abs(Math.log2(board[nextRow][nextCol] - Math.log2(board[row][col])));
//     //                 }
//     //             }
//     //         }
//     //     }
//     // }

//     // for (let row = 3; row >=0; row--) {
//     //     if (row % 2 !== 0) {
//     //         for (let col = 0; col < 4; col++) {
//     //             let nextRow = 0;
//     //             let nextCol = 0;
//     //             if (col === 3 && row > 0) {
//     //                 nextRow = row - 1;
//     //                 nextCol = col;
//     //             } else {
//     //                 nextCol = col + 1;
//     //                 nextRow = row;
//     //             }

//     //             if (validPosition(nextRow, nextCol)) {
//     //                 if (board[nextRow][nextCol] < board[row][col]) {
//     //                     evaluation[3] -= Math.abs(Math.log2(board[nextRow][nextCol] - Math.log2(board[row][col])));
//     //                 }
//     //             }
//     //         }
//     //     } else {
//     //         for (let col = 3; col >= 0; col--) {
//     //             let nextRow = 0;
//     //             let nextCol = 0;
//     //             if (col === 0 && row > 0) {
//     //                 nextCol = col;
//     //                 nextRow = row - 1;
//     //             } else {
//     //                 nextCol = col - 1;
//     //                 nextRow = row;
//     //             }

//     //             if (validPosition(nextRow, nextCol)) {
//     //                 if (board[nextRow][nextCol] < board[row][col]) {
//     //                     evaluation[3] -= Math.abs(Math.log2(board[nextRow][nextCol] - Math.log2(board[row][col])));
//     //                 }
//     //             }
//     //         }
//     //     }
//     // }

//     // for (let col = 3; col >= 0; col--) {
//     //     if (col % 2 !== 0) {
//     //         for (let row = 0; row < 4; row++) {
//     //             let nextRow = 0;
//     //             let nextCol = 0;
//     //             if (row === 3 && col > 0) {
//     //                 nextCol = col - 1;
//     //                 nextRow = row;
//     //             } else {
//     //                 nextRow = row + 1;
//     //                 nextCol = col;
//     //             }

//     //             if (validPosition(nextRow, nextCol)) {
//     //                 if (board[nextRow][nextCol] < board[row][col]) {
//     //                     evaluation[4] -= Math.abs(Math.log2(board[nextRow][nextCol] - Math.log2(board[row][col])));
//     //                 }
//     //             }
//     //         }
//     //     } else {
//     //         for (let row = 3; row >= 0; row--) {
//     //             let nextRow = 0;
//     //             let nextCol = 0;
//     //             if (row === 0 && col > 0) {
//     //                 nextRow = row;
//     //                 nextCol = col - 1;
//     //             } else {
//     //                 nextRow = row - 1;
//     //                 nextCol = col;
//     //             }

//     //             if (validPosition(nextRow, nextCol)) {
//     //                 if (board[nextRow][nextCol] < board[row][col]) {
//     //                     evaluation[4] -= Math.abs(Math.log2(board[nextRow][nextCol] - Math.log2(board[row][col])));
//     //                 }
//     //             }
//     //         }
//     //     }
//     // }

//     // for (let col = 3; col >= 0; col--) {
//     //     if (col % 2 === 0) {
//     //         for (let row = 0; row < 4; row++) {
//     //             let nextRow = 0;
//     //             let nextCol = 0;
//     //             if (row === 3 && col > 0) {
//     //                 nextCol = col - 1;
//     //                 nextRow = row;
//     //             } else {
//     //                 nextRow = row + 1;
//     //                 nextCol = col;
//     //             }

//     //             if (validPosition(nextRow, nextCol)) {
//     //                 if (board[nextRow][nextCol] < board[row][col]) {
//     //                     evaluation[5] -= Math.abs(Math.log2(board[nextRow][nextCol] - Math.log2(board[row][col])));
//     //                 }
//     //             }
//     //         }
//     //     } else {
//     //         for (let row = 3; row >= 0; row--) {
//     //             let nextRow = 0;
//     //             let nextCol = 0;
//     //             if (row === 0 && col > 0) {
//     //                 nextRow = row;
//     //                 nextCol = col - 1;
//     //             } else {
//     //                 nextRow = row - 1;
//     //                 nextCol = col;
//     //             }

//     //             if (validPosition(nextRow, nextCol)) {
//     //                 if (board[nextRow][nextCol] < board[row][col]) {
//     //                     evaluation[5] -= Math.abs(Math.log2(board[nextRow][nextCol] - Math.log2(board[row][col])));
//     //                 }
//     //             }
//     //         }
//     //     }
//     // }

//     // for (let col = 0; col < 4; col++) {
//     //     if (col % 2 !== 0) {
//     //         for (let row = 0; row < 4; row++) {
//     //             let nextRow = 0;
//     //             let nextCol = 0;
//     //             if (row === 3 && col > 0) {
//     //                 nextCol = col - 1;
//     //                 nextRow = row;
//     //             } else {
//     //                 nextRow = row + 1;
//     //                 nextCol = col;
//     //             }

//     //             if (validPosition(nextRow, nextCol)) {
//     //                 if (board[nextRow][nextCol] < board[row][col]) {
//     //                     evaluation[6] -= Math.abs(Math.log2(board[nextRow][nextCol] - Math.log2(board[row][col])));
//     //                 }
//     //             }
//     //         }
//     //     } else {
//     //         for (let row = 3; row >= 0; row--) {
//     //             let nextRow = 0;
//     //             let nextCol = 0;
//     //             if (row === 0 && col > 0) {
//     //                 nextRow = row;
//     //                 nextCol = col - 1;
//     //             } else {
//     //                 nextRow = row - 1;
//     //                 nextCol = col;
//     //             }

//     //             if (validPosition(nextRow, nextCol)) {
//     //                 if (board[nextRow][nextCol] < board[row][col]) {
//     //                     evaluation[6] -= Math.abs(Math.log2(board[nextRow][nextCol] - Math.log2(board[row][col])));
//     //                 }
//     //             }
//     //         }
//     //     }
//     // }

//     for (let col = 0; col < 4; col++) {
//         if (col % 2 === 0) {
//             for (let row = 0; row < 4; row++) {
//                 let nextRow = 0;
//                 let nextCol = 0;
//                 if (row === 3 && col > 0) {
//                     nextCol = col - 1;
//                     nextRow = row;
//                 } else {
//                     nextRow = row + 1;
//                     nextCol = col;
//                 }

//                 if (validPosition(nextRow, nextCol)) {
//                     if (board[nextRow][nextCol] < board[row][col]) {
//                         evaluation[7] -= Math.abs(Math.log2(board[nextRow][nextCol] - Math.log2(board[row][col])));
//                     }
//                 }
//             }
//         } else {
//             for (let row = 3; row >= 0; row--) {
//                 let nextRow = 0;
//                 let nextCol = 0;
//                 if (row === 0 && col > 0) {
//                     nextRow = row;
//                     nextCol = col - 1;
//                 } else {
//                     nextRow = row - 1;
//                     nextCol = col;
//                 }

//                 if (validPosition(nextRow, nextCol)) {
//                     if (board[nextRow][nextCol] < board[row][col]) {
//                         evaluation[7] -= Math.abs(Math.log2(board[nextRow][nextCol] - Math.log2(board[row][col])));
//                     }
//                 }
//             }
//         }
//     }

//     return (evaluation[0] > evaluation[7]) ? evaluation[0] : evaluation[7];
// }