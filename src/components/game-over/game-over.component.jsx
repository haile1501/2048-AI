import { useEffect } from 'react';
import Button from '../button/button.component';

import './game-over.styles.scss';

const GameOver = ({ restartGame, trial }) => {
    
    useEffect(() => {
        if (trial < 100) {
            setTimeout(() => document.querySelector('button').click(), 50);
        }
    }, [trial]);

    return (
        <div className='game-over'>
            <h1>Game over!</h1>
            <Button onClick={restartGame}>Play Again</Button>
        </div>
    );
}

export default GameOver;