import { useState, useEffect, useContext } from 'react';

import Tile from '../tile/tile.component';
import GameOver from '../game-over/game-over.component';
import { GameStateContext } from '../../context/game-state.context';
import { AiContext } from '../../context/ai.context';
import Algorithms from '../../algorithms/algorithms.component';

import './game-board.styles.scss';
import axios from 'axios';

const API = "http://localhost:6969";

const generateTemplate = () => {
    const templateArray = new Array(4);
    for (let i = 0; i < 4; i++) {
        templateArray[i] = new Array(4).fill(0);
    }

    let [row1, row2, col1, col2] = [0, 0, 0, 0];
    row1 = Math.floor(Math.random() * 4);
    col1 = Math.floor(Math.random() * 4);
    templateArray[row1][col1] = 2;
    do {
        row2 = Math.floor(Math.random() * 4);
        col2 = Math.floor(Math.random() * 4);
    } while (row2 === row1 && col2 === col1);
    const prob = Math.random();
    if (prob < 0.1) {
        templateArray[row2][col2] = 4;
    } else {
        templateArray[row2][col2] = 2;
    }

    return templateArray;
}

const GameBoard = () => {
    const [board, setBoard] = useState(() => generateTemplate());
    const { score, setScore, highScore, restart, setRestart, count, trial, setTrial, gameOver, setGameOver } = useContext(GameStateContext);
    const { pause, algorithm, maxDepth, numberOfIterations, simulationDepth } = useContext(AiContext);

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

    const restartGame = () => {
        setScore(0);
        setGameOver(false);
        setBoard(generateTemplate());
        setTrial(1);
    }

    const handleKeyDown = (event) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'].indexOf(event.key) > -1) {
            event.preventDefault();
        } else {
            return;
        }
        const newBoard = JSON.parse(JSON.stringify(board));
        let changed = false;
        let plusPoint = 0;

        switch (event.key) {
            case 'ArrowUp':
                for (let col = 0; col <= 3; col++) {
                    const colArray = [];
                    for (let row = 0; row <= 3; row++) {
                        if (newBoard[row][col] !== 0) {
                            colArray.push(newBoard[row][col]);
                            if (row !== colArray.length - 1) {
                                changed = true;
                            }
                        }
                    }
                    for (let i = 0; i < colArray.length - 1; i++) {
                        if (colArray[i] === colArray[i + 1]) {
                            changed = true;
                            colArray[i] += colArray[i + 1];
                            plusPoint += colArray[i];
                            colArray.splice(i + 1, 1);
                        }
                    }
                    if (changed) {
                        for (let i = 0; i < 4; i++) {
                            if (colArray[i]) {
                                newBoard[i][col] = colArray[i];
                            } else {
                                newBoard[i][col] = 0;
                            }
                        }
                    }
                }
                break;
            case 'ArrowDown':
                for (let col = 0; col <= 3; col++) {
                    const colArray = [];
                    for (let row = 3; row >= 0; row--) {
                        if (newBoard[row][col] !== 0) {
                            colArray.push(newBoard[row][col]);
                            if (3 - row !== colArray.length - 1) {
                                changed = true;
                            }
                        }
                    }
                    for (let i = 0; i < colArray.length - 1; i++) {
                        if (colArray[i] === colArray[i + 1]) {
                            changed = true;
                            colArray[i] += colArray[i + 1];
                            plusPoint += colArray[i];
                            colArray.splice(i + 1, 1);
                        }
                    }
                    if (changed) {
                        for (let i = 0; i < 4; i++) {
                            if (colArray[i]) {
                                newBoard[3 - i][col] = colArray[i];
                            } else {
                                newBoard[3 - i][col] = 0;
                            }
                        }
                    }
                }
                break;
            case 'ArrowRight':
                for (let row = 0; row <= 3; row++) {
                    const rowArray = [];
                    for (let col = 3; col >= 0; col--) {
                        if (newBoard[row][col] !== 0) {
                            rowArray.push(newBoard[row][col]);
                            if (3 - col !== rowArray.length - 1) {
                                changed = true;
                            }
                        }
                    }
                    for (let i = 0; i < rowArray.length - 1; i++) {
                        if (rowArray[i] === rowArray[i + 1]) {
                            changed = true;
                            rowArray[i] += rowArray[i + 1];
                            plusPoint += rowArray[i];
                            rowArray.splice(i + 1, 1);
                        }
                    }
                    if (changed) {
                        for (let i = 0; i < 4; i++) {
                            if (rowArray[i]) {
                                newBoard[row][3 - i] = rowArray[i];
                            } else {
                                newBoard[row][3 - i] = 0;
                            }
                        }
                    }
                }
                break;
            case 'ArrowLeft':
                for (let row = 0; row <= 3; row++) {
                    const rowArray = [];
                    for (let col = 0; col <= 3; col++) {
                        if (newBoard[row][col] !== 0) {
                            rowArray.push(newBoard[row][col]);
                            if (col !== rowArray.length - 1) {
                                changed = true;
                            }
                        }
                    }
                    for (let i = 0; i < rowArray.length - 1; i++) {
                        if (rowArray[i] === rowArray[i + 1]) {
                            changed = true;
                            rowArray[i] += rowArray[i + 1];
                            plusPoint += rowArray[i];
                            rowArray.splice(i + 1, 1);
                        }
                    }
                    if (changed) {
                        for (let i = 0; i < 4; i++) {
                            if (rowArray[i]) {
                                newBoard[row][i] = rowArray[i];
                            } else {
                                newBoard[row][i] = 0;
                            }
                        }
                    }
                }
                break;
            default:
                break;
        }
        if (changed) {
            generateNewTile(newBoard);
            setScore(score => score + plusPoint);
            setBoard(newBoard);
        }
    }

    useEffect(() => {
        const checkSurrounding = (row, col) => {
            const move_x = [0, 1, -1, 0];
            const move_y = [1, 0, 0, -1];

            for (let i = 0; i < 4; i++) {
                let x = row + move_x[i];
                let y = col + move_y[i];
                if (x >= 0 && x < 4 && y >= 0 && y < 4) {
                    if (board[x][y] === 0 || board[row][col] === board[x][y]) {
                        return true;
                    }
                }
            }
            return false;
        }

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (board[row][col] === 0) {
                    return;
                } else if (checkSurrounding(row, col)) {
                    return;
                }
            }
        }
        setTimeout(() => setGameOver(true), 1200);
    }, [board, setGameOver]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    useEffect(() => {
        if (gameOver) {
            localStorage.setItem('highScore', JSON.stringify(highScore));

            if (trial < count) {
                setTrial(trial => trial + 1);
                setScore(0);
                setGameOver(false);
                setBoard(generateTemplate());
            }
        }
    }, [gameOver, highScore, count, trial, setTrial, setScore, setGameOver, setBoard]);

    useEffect(() => {
        const maxTile = board => {
            let maxValue = -1;
            for (let row = 0; row < 4; row++) {
                for (let col = 0; col < 4; col++) {
                    if (board[row][col] > 0 && board[row][col] > maxValue) {
                        maxValue = board[row][col];
                    }
                }
            }

            return maxValue;
        }

        if (gameOver) {
            axios.post(`${API}/api/v1/add-result/${algorithm}`, {
                score: score,
                algorithm: algorithm,
                maxDepth: algorithm === 'mcts' ? 0 : maxDepth,
                iterations: algorithm === 'mcts' ? numberOfIterations : 0,
                simulationDepth: algorithm === 'mcts' ? simulationDepth: 0,
                maxTile: maxTile(board)
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => { 
                console.log(err);
            })
        }
    },[gameOver, algorithm, simulationDepth, numberOfIterations, maxDepth, score, board]);

    useEffect(() => {
        if (restart) {
            localStorage.setItem('highScore', JSON.stringify(highScore));
            setRestart(false);
            setGameOver(false);
            setScore(0);
            setBoard(generateTemplate());

            if (gameOver) {
                setTrial(1);
            }
        }
    }, [restart, setRestart, setScore, setBoard, highScore, setGameOver, gameOver, setTrial]);

    return (
        <div className={`game-board`}>
            {!pause && <Algorithms board={board} restartGame={restartGame} />}
            {gameOver && <GameOver restartGame={restartGame} gameOver={gameOver} />}

            {

                board.map((row, indexRow) => {
                    return (
                        row.map((tile, indexColumn) => {
                            return <Tile key={`${indexRow}${indexColumn}`} value={tile} />
                        })
                    )
                })
            }
        </div>
    )
}

export default GameBoard;