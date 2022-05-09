import './game-over.styles.scss';

const GameOver = ({ restartGame }) => {
    return (
        <div className='game-over'>
            <h1>Game over!</h1>
            <button onClick={restartGame}>Play Again</button>
        </div>
    );
}

export default GameOver;