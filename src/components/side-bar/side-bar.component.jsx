import { useContext } from 'react';

import Button from '../button/button.component';
import { AiContext } from '../../context/ai.context';
import { GameStateContext } from '../../context/game-state.context';
import OptionsBar from '../options-bar/options-bar.component';
import ErrorMessage from '../error-message/error-massage.component';

import './side-bar.styles.scss';
import { useState } from 'react';

const MAX_DEPTH = [4, 5, 6];
const ALGORITHMS = ['Minimax', 'Expectimax', 'MCTS'];

const SideBar = () => {
    const { pause,
        setPause,
        maxDepth,
        setMaxDepth,
        algorithm,
        setAlgorithm,
        numberOfIterations,
        setNumberOfIterations,
        simulationDepth,
        setSimulationDepth,
        setChangeWhenOver
    } = useContext(AiContext);

    const { count, setCount, setTrial, gameOver } = useContext(GameStateContext);

    const [config, setConfig] = useState({
        numberOfIterations: numberOfIterations,
        simulationDepth: simulationDepth,
        numberOfPlays: count
    });

    const handleClick = () => {
        setPause(!pause);
    }

    const changeMaxDepth = event => {
        setMaxDepth(+event.target.value);
    }

    const handleChange = event => {
        if (gameOver) {
            setChangeWhenOver(true);
        }
        setAlgorithm(event.target.value);
    }

    const handleInputChange = event => {
        setConfig(config => ({
            ...config,
            [event.target.id]: event.target.value
        }));
    }

    const applyChange = () => {
        if (gameOver) {
            setChangeWhenOver(true);
            if (+config.numberOfPlays > 0) {
                setTrial(+config.numberOfPlays);
            }
        }
        if (Number.isInteger(+config.numberOfIterations) && +config.numberOfIterations > 1) {
            setNumberOfIterations(+config.numberOfIterations);
        }
        
        if  (Number.isInteger(+config.simulationDepth) && +config.simulationDepth > 0) {
            setSimulationDepth(+config.simulationDepth);
        }
        
        if (Number.isInteger(+config.numberOfPlays) && +config.numberOfPlays > 0) {
            setCount(+config.numberOfPlays);
        }
    }

    return (
        <div className='side-bar'>
            <div className="algorithm-selection">
                <h3>ALGORITHM</h3>
                {ALGORITHMS.map((algorithmItem, index) => {
                    return (
                        <div key={index}>
                            <input type="radio" value={algorithmItem} name="algorithm" id={algorithmItem} checked={algorithm === algorithmItem} onChange={(event) => handleChange(event)} />
                            <label htmlFor={algorithmItem}>{algorithmItem}</label>
                        </div>
                    );
                })}
            </div>
            <OptionsBar optionType={algorithm === 'MCTS' ? 'mcts' : null}>
                {
                    algorithm !== 'MCTS' ?
                        <div>
                            <h4><u>Max depth</u></h4>
                            <div className='other-config'>
                                {MAX_DEPTH.map(depth => <Button onClick={(event) => changeMaxDepth(event)} key={depth} value={depth} selected={depth === maxDepth ? 'selected' : null}>{depth}</Button>)}
                            </div>
                        </div>
                        :
                        <div className='mcts-config'>
                            <label htmlFor="numberOfIterations">Number of iterations: {numberOfIterations}</label>
                            <ErrorMessage>{(Number.isInteger(+config.numberOfIterations) && +config.numberOfIterations > 1) ? '' : 'Integer greater than 1 required!'}</ErrorMessage>
                            <input type="text" name="numberOfIterations" id="numberOfIterations" value={config.numberOfIterations} onChange={event => handleInputChange(event)} />
                            <label htmlFor="simulationDepth">Simulation depth: {simulationDepth}</label>
                            <ErrorMessage>{(Number.isInteger(+config.simulationDepth) && +config.simulationDepth > 0) ? '' : 'Positive integer required!'}</ErrorMessage>
                            <input type="text" name="simulationDepth" id="simulationDepth" value={config.simulationDepth} onChange={event => handleInputChange(event)} />
                        </div>
                }
                <div className='footer'>
                    <label htmlFor="numberOfPlays">Times: {count}</label>
                    <ErrorMessage>{(Number.isInteger(+config.numberOfPlays) && +config.numberOfPlays > 0) ? '' : 'Positive integer required!'}</ErrorMessage>
                    <input type="text" name="numberOfPlays" value={config.numberOfPlays} onChange={event => handleInputChange(event)} id="numberOfPlays" />
                    <Button onClick={applyChange}>Apply</Button>
                </div>
            </OptionsBar>
            <div>

                <div className='pause-button'><Button onClick={handleClick}>{pause ? 'Run AI' : 'Pause AI'}</Button></div>
            </div>
        </div>
    )
}

export default SideBar;