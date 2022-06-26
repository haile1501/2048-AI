import { useContext } from 'react';

import Result from '../result/result.component';
import { RecordContext } from '../../context/record.context';

import './stats-board.styles.scss';
import { GameStateContext } from '../../context/game-state.context';
import { useEffect } from 'react';
import { useRef } from 'react';

const StatsBoard = () => {
    const { record } = useContext(RecordContext);
    const { bestRecord } = useContext(GameStateContext);

    const resultContainersBottom = useRef(null);

    useEffect(() => {
        resultContainersBottom.current?.scrollIntoView({ behavior: "smooth" });
    }, [record]);

    return (
        <div className="stats-board">
            <div className='stats-header'>
                <div className='stats-header-block'><u>No.</u></div>
                <div className='stats-header-block'><u>Algorithm</u></div>
                <div className='stats-header-block'><u>Max Tile</u></div>
                <div className='stats-header-block'><u>Steps</u></div>
            </div>
            {bestRecord.algorithm && <Result type='best' result={bestRecord} />}
            <div className="results-container">
                {
                    record.map((result, index) => <Result index={index + 1} result={result} type={null} key={index} />)
                }
                <div ref={resultContainersBottom} className='bottom' />
            </div>
            <p className="comment">*Steps: Number of steps to get the 2048 tile.</p>
        </div>
    )
}

export default StatsBoard;