import { useState, createContext, useEffect } from "react";

export const GameStateContext = createContext({
    score: null,
    setScore: () => null,
    highScore: null,
    setHighScore: () => null,
    restart: null,
    setRestart: () => null,
    count: null,
    setCount: () => null,
    trial: null,
    setTrial: () => null,
    gameOver: null,
    setGameOver: () => null
});

export const GameStateProvider = ({ children }) => {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [restart, setRestart] = useState(false);
    const [count, setCount] = useState(1);
    const [trial, setTrial] = useState(1);
    const [gameOver, setGameOver] = useState(false);

    const value = { score, setScore, highScore, setHighScore, restart, setRestart, count, setCount, trial, setTrial, gameOver, setGameOver };


    useEffect(() => {
        const savedHighScore = localStorage.getItem('highScore');
        if (!savedHighScore) {
            localStorage.setItem('highScore', '0');
            setHighScore(0);
        } else {
            setHighScore(JSON.parse(savedHighScore));
        }
    }, []);

    return <GameStateContext.Provider value={value}>
        {children}
    </GameStateContext.Provider>
}