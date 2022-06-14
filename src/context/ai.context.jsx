import { useState, createContext } from "react";

export const AiContext = createContext({
    pause: null,
    setPause: () => null,
    maxDepth: null,
    setMaxDepth: () => null,
    algorithm: null,
    setAlgorithm: () => null
});

export const AiProvider = ({ children }) => {
    const [pause, setPause] = useState(true);
    const [maxDepth, setMaxDepth] = useState(4);
    const [algorithm, setAlgorithm] = useState('Minimax');

    const value = { pause, setPause, maxDepth, setMaxDepth, algorithm, setAlgorithm };

    return <AiContext.Provider value={value}>
        { children }
    </AiContext.Provider>  
}       