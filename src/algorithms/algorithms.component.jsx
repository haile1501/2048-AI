import { useEffect, useContext } from "react";

import { AiContext } from '../context/ai.context';
import { GameStateContext } from "../context/game-state.context";
import { minimax } from "./minimax";
import { expectimax } from "./expectimax";
import { mcts } from "./mcts";

const ALGORITHMS = {
    Minimax: minimax,
    Expectimax: expectimax,
    MCTS: mcts
};

const Algorithms = ({ board }) => {
    const { maxDepth, algorithm, numberOfIterations, simulationDepth } = useContext(AiContext);
    const { gameOver } = useContext(GameStateContext);

    useEffect(() => {
        if (!gameOver) {
            const boardCopy = JSON.parse(JSON.stringify(board));
            let direction = null;
            if (algorithm === 'MCTS') {
                direction = ALGORITHMS[algorithm](boardCopy, numberOfIterations, simulationDepth);
            } else {
                direction = ALGORITHMS[algorithm](boardCopy, maxDepth);
            }
            
            setTimeout(() => window.dispatchEvent(new KeyboardEvent('keydown', {'key': direction})), 0);
        }
    }, [board, algorithm, maxDepth, numberOfIterations, simulationDepth, gameOver]);
}

export default Algorithms;