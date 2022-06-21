import Button from '../button/button.component';

import './game-over.styles.scss';

const GameOver = ({ restartGame }) => {

    return (
        <div className='game-over'>
            <h1>Game over!</h1>
            <Button onClick={restartGame}>Play Again</Button>
        </div>
    );
}

export default GameOver;