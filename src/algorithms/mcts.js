import { DIRECTIONS } from "./ai-controller";

import { heuristicFunction } from "./heuristic-function/heuristic";

class Node {

    constructor(board, parent, direction) {
        this.board = board;
        this.children = [];
        this.totalScore = 0;
        this.numberVisits = 0;
        this.parent = parent;
        this.direction = direction;
    }

}

const ucbCal = (totalScore, numberVisits, parentVisits) => {

    if (numberVisits === 0) {
        return 99999999;
    }

    const ucb = totalScore / numberVisits + 2 * Math.sqrt(Math.log(parentVisits) / numberVisits);

    return ucb;
}

const expand = () => {

}

const simulate = (node, maxSimulations) => {

}

const backup = node => {
    while (node !== null) {
        node.numberVisits++;

        if (node.parent !== null) {
            node.parent.totalScore += node.totalScore;
        }

        node = node.parent;
    }
}

const select = (node, maxSimulations) => {
    if (node.children.length === 0) {
        if (node.numberVisits === 0) {
            node.totalScore = simulate(node, maxSimulations);
            backup(node);
        } else {
            expand(node);
        }
    } else {

        let maxUcb = -1;
        let nextNode = null;
        for (let child of node.children) {
            let childUcb = ucbCal(child.totalScore, child.numberVisits, node.numberVisits);

            if (childUcb > maxUcb) {
                maxUcb = childUcb;
                nextNode = child;
            }
        }

        select(nextNode, maxSimulations);
    }
}

const iterate = (root, maxIterations, maxSimulations) => {
    let i = 0;

    while (i !== maxIterations) {

    }


    let maxScore = -1;
    let direction = null;
    for (let child of root.children) {
        if (child.totalScore > maxScore) {
            maxScore = child.totalScore;
            direction = child.direction;
        }
    }

    return direction;
}

export const mcts = (board, maxIterations = 10, maxSimulations = 1000) => {
    const root = new Node(board, null, null);

    for (let direction of Object.keys(DIRECTIONS)) {
        const newBoard = JSON.parse(JSON.stringify(board));
        if (DIRECTIONS[direction](newBoard)) {
            let node = new Node(newBoard, root, direction);
            root.children.push(node);
        }
    }

    return iterate(board, maxIterations, maxSimulations)
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
