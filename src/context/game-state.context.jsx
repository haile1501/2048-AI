import { useState, createContext, useEffect } from "react";

export const GameStateContext = createContext({
    score: null,
    setScore: () => null,
    highScore: null,
    setHighScore: () => null,
    bestRecord: null,
    setBestRecord: () => null,
    restart: null,
    setRestart: () => null,
    count: null,
    setCount: () => null,
    trial: null,
    setTrial: () => null,
    gameOver: null,
    setGameOver: () => null,
    steps: null,
    setSteps: () => null
});

export const GameStateProvider = ({ children }) => {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [restart, setRestart] = useState(false);
    const [count, setCount] = useState(1);
    const [trial, setTrial] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [steps, setSteps] = useState(0);
    const [bestRecord, setBestRecord] = useState({});

    const value = {
        score,
        setScore,
        highScore,
        setHighScore,
        restart,
        setRestart,
        count, 
        setCount,
        trial,
        setTrial,
        gameOver,
        setGameOver,
        steps,
        setSteps,
        bestRecord,
        setBestRecord
    };


    useEffect(() => {
        const savedBestRecord = localStorage.getItem('bestRecord');
        const savedHighScore = localStorage.getItem('highScore');
        if (!savedBestRecord) {
            localStorage.setItem('bestRecord', JSON.stringify({
                score: 0,
                steps: 0,
                tile: 0,
                algorithm: null,
            }));
            setBestRecord({
                score: 0,
                steps: 0,
                tile: 0,
                algorithm: null,
            });

            setHighScore(0);
        } else {
            const parsedBestRecord = JSON.parse(savedBestRecord);
            setBestRecord(parsedBestRecord);
        }

        if (!savedHighScore) {
            localStorage.setItem('highScore', JSON.stringify(0));
            setHighScore(0);
        } else {
            setHighScore(JSON.parse(savedHighScore));
        }
    }, []);

    return <GameStateContext.Provider value={value}>
        {children}
    </GameStateContext.Provider>
}