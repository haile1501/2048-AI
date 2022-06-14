import { useEffect, useContext } from "react";

import { AiContext } from '../context/ai.context';
import { minimax } from "./minimax";
import { expectimax } from "./expectimax";

const ALGORITHMS = {
    Minimax: minimax,
    Expectimax: expectimax,
    
};

const Algorithms = ({ board }) => {
    const { maxDepth, algorithm } = useContext(AiContext);

    useEffect(() => {
        const boardCopy = JSON.parse(JSON.stringify(board));
        const direction = ALGORITHMS[algorithm](boardCopy, maxDepth);
        setTimeout(() => window.dispatchEvent(new KeyboardEvent('keydown', {'key': direction})), 200);
    }, [board, algorithm, maxDepth]);
}

export default Algorithms;