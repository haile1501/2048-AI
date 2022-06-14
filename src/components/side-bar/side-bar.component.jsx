import { useContext } from 'react';

import Button from '../button/button.component';
import { AiContext } from '../../context/ai.context';
import OptionsBar from '../options-bar/options-bar.component';

import './side-bar.styles.scss';

const MAX_DEPTH = [4, 5, 6];
const ALGORITHMS = ['Minimax', 'Expectimax'];

const SideBar = () => {
    const { pause, setPause, setMaxDepth, algorithm, setAlgorithm } = useContext(AiContext);

    const handleClick = () => {
        setPause(!pause);
    }

    const changeMaxDepth = event => {
        setMaxDepth(+event.target.value);
    }

    const handleChange = event => {
        setAlgorithm(event.target.value);
    }

    return (
        <div className='side-bar'>
            <div className="algorithm-selection">
                {ALGORITHMS.map((algorithmItem, index) => {
                    return (
                        <div key={index}>
                            <input type="radio" value={algorithmItem} name="algorithm" id={algorithmItem} checked={algorithm === algorithmItem} onChange={(event) => handleChange(event)} />
                            <label htmlFor={algorithmItem}>{algorithmItem}</label>
                        </div>
                    );
                })}
            </div>
            <OptionsBar>
                {MAX_DEPTH.map(depth => <Button onClick={(event) => changeMaxDepth(event)} key={depth} value={depth}>{depth}</Button>)}
            </OptionsBar>
            <div className='pause-button'><Button onClick={handleClick}>{pause ? 'Run' : 'Pause'}</Button></div>
        </div>
    )
}

export default SideBar;