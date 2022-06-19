import { useState, createContext } from "react";

export const AiContext = createContext({
    pause: null,
    setPause: () => null,
    maxDepth: null,
    setMaxDepth: () => null,
    algorithm: null,
    setAlgorithm: () => null,
    numberOfIterations: null,
    setNumberOfIterations: () => null,
    simulationDepth: null,
    setSimulationDepth: () => null
});

export const AiProvider = ({ children }) => {
    const [pause, setPause] = useState(true);
    const [maxDepth, setMaxDepth] = useState(4);
    const [algorithm, setAlgorithm] = useState('Minimax');
    const [numberOfIterations, setNumberOfIterations] = useState(5000);
    const [simulationDepth, setSimulationDepth] = useState(5000);

    const value = {
        pause,
        setPause,
        maxDepth,
        setMaxDepth,
        algorithm,
        setAlgorithm,
        numberOfIterations,
        setNumberOfIterations,
        simulationDepth,
        setSimulationDepth
    };

    return <AiContext.Provider value={value}>
        {children}
    </AiContext.Provider>
}       