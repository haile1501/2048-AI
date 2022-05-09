import './score-board.styles.scss';

const ScoreBoard = ({ currentScore, bestScore }) => {
    return (
        <div className='score-board'>
            <div className='score-board-child'>
                <h2 className='score-type'>SCORE</h2>
                <h2 className='score'>1000</h2>
            </div>
            <div className='score-board-child'>
                <h2 className='score-type'>BEST</h2>
                <h2 className='score'>2000</h2>
            </div>
        </div>
    );
}

export default ScoreBoard;