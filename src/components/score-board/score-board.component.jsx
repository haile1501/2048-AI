import { useContext } from 'react';

import { GameStateContext } from '../../context/game-state.context';

import './score-board.styles.scss';

const ScoreBoard = () => {
    const { score, highScore, setHighScore } = useContext(GameStateContext);

    if ( score > highScore ) {
        setHighScore(score);
    }

    return (
        <div className='score-board'>
            <div className='score-board-child'>
                <h2 className='score-type'>SCORE</h2>
                <h2 className='score'>{score}</h2>
            </div>
            <div className='score-board-child'>
                <h2 className='score-type'>BEST</h2>
                <h2 className='score'>{highScore}</h2>
            </div>
        </div>
    );
}

export default ScoreBoard;