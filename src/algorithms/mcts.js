import { DIRECTIONS } from "./ai-controller";

class Node {
    constructor(board, parent, direction, human) {
        this.board = board;
        this.parent = parent;
        this.direction = direction;
        this.numberOfVisits = 0;
        this.totalScore = 0;
        this.children = [];
        this.human = human;
    }
}

const totalTiles = board => {
    let total = 0;
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] !== 0) {
                total += board[row][col];
            }
        }
    }

    return total/16;
}

const ucb1 = ({ totalScore, parent, numberOfVisits }) => {

    if (numberOfVisits === 0) {
        return 99999999;
    }

    return totalScore / numberOfVisits + 2 * Math.sqrt(Math.log(parent.numberOfVisits) / numberOfVisits);
}

const expand = node => {
    if (node.human) {
        for (let direction of Object.keys(DIRECTIONS)) {
            const newBoard = JSON.parse(JSON.stringify(node.board));
            if (DIRECTIONS[direction](newBoard)) {
                let child = new Node(newBoard, node, direction, !node.human);
                node.children.push(child);
            }
        }
    } else {
        for (let row = 0; row < 4; row++) {
            for (let column = 0; column < 4; column++) {
                if (node.board[row][column] === 0) {
                    for (let tile of [2, 4]) {
                        const newBoard = JSON.parse(JSON.stringify(node.board));
                        newBoard[row][column] = tile;
                        let child = new Node(newBoard, node, null, !node.human);
                        node.children.push(child);
                    }
                }
            }
        }
    }
}

const iterate = (node, maxSimulations) => {
    let selectedChild = select(node);
    if (selectedChild.numberOfVisits === 0) {
        let score = simulate(selectedChild, maxSimulations);
        backup(selectedChild, score);
    } else {
        expand(selectedChild);
        
        if (selectedChild.children.length === 0) {
            backup(selectedChild, 0);
        } else {
            let score = simulate(selectedChild.children[0], maxSimulations);
            backup(selectedChild.children[0], score);
        }
    }
}

const simulate = (node, maxSimulations) => {
    const newBoard = JSON.parse(JSON.stringify(node.board));
    let human = node.human;

    const generateNewTile = (newBoard) => {
        let [row, col] = [0, 0];
        do {
            row = Math.floor(Math.random() * 4);
            col = Math.floor(Math.random() * 4);
        } while (newBoard[row][col] !== 0);
        const prob = Math.random();
        if (prob < 0.1) {
            newBoard[row][col] = 4;
        } else {
            newBoard[row][col] = 2;
        }
    }

    for (let s = 0; s < maxSimulations; s++) {
        if (human) {
            let trials = 0;
            const check = [false, false, false, false];
            const move = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];
    
            while (true) {
                if (trials === 4) {
                    return totalTiles(newBoard);
                }
    
                let moveIndex = Math.floor(Math.random() * 4);
                if (!check[moveIndex]) {
                    trials++;
                    check[moveIndex] = true;
                    
                    if (DIRECTIONS[move[moveIndex]](newBoard)) {
                        human = !human;
                        break;
                    }
                }
            }
        } else {
            let count = 0;
            for (let row = 0; row < 4; row++) {
                for (let col = 0; col < 4; col++) {
                    if (newBoard[row][col] !== 0) {
                        count++;
                    }
                }
            }
            if (count === 16) {
                return totalTiles(newBoard);
            } else {
                generateNewTile(newBoard);
                human = !human;
            }
        }
        
    }

    return totalTiles(newBoard);
}

const backup = (node, score) => {
    node.totalScore = score;

    while (node !== null) {
        node.numberOfVisits++;

        if (node.parent !== null) {
            node.parent.totalScore += score;
        }

        node = node.parent;
    }
}

const select = node => {
    if (node.children.length === 0) {
        return node;
    } else {
        let maxChild = null;
        let maxUcb1 = -1;
        node.children.forEach(child => {
            if (ucb1(child) > maxUcb1) {
                maxUcb1 = ucb1(child);
                maxChild = child;
            }
        });

        return select(maxChild);
    }
}

export const mcts = (board, maxIterations, maxSimulations) => {
    const root = new Node(board, null, null, true);
    
    for (let i = 0; i < maxIterations; i++) {
        iterate(root, maxSimulations);
    }

    let direction = null;
    let maxChildScore = -1;

    root.children.forEach(child => {
        if (child.totalScore > maxChildScore) {
            maxChildScore = child.totalScore;
            direction = child.direction;
        }
    });

    return direction;
}


/**
 * UCB = v + 2 sqrt(ln(N)/n);
 * v = t/n: avarage score (t is total score)
 * N : parent visits
 * n : current node visits
 * 
 * 
 * selection -> expansion -> simulation -> backup
 */
