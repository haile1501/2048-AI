import { useContext } from 'react';

import ScoreBoard from '../score-board/score-board.component';
import Button from '../button/button.component';
import { GameStateContext } from '../../context/game-state.context';

import './top-board.styles.scss';

const TopBoard = () => {
    const { setRestart } = useContext(GameStateContext);

    const handleClick = () => {
        setRestart(true);
    }

    return (
        <div className='top-board'>
            <h1>2048</h1>
            <ScoreBoard />
            <p>Join the numbers to get to the <span>2048 tile!</span></p>
            <Button onClick={handleClick}>New Game</Button>
        </div>
    );
}

export default TopBoard;