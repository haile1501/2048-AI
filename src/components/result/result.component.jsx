import './result.styles.scss';

const Result = ({ index, type, result }) => {
    let resultColorIndex = 'even';
    if (index % 2 !== 0) {
        resultColorIndex = 'odd';
    }

    return (
        <div className={`result-container ${resultColorIndex} ${type}`}>
            <div className="result-block">{type === 'best' ? <i className="fa-solid fa-trophy"></i> : `#${index}`}</div>
            <div className="result-block">{result.algorithm}</div>
            <div className="result-block">{result.tile}</div>
            <div className="result-block">{result.steps}</div>
        </div>
    )
}

export default Result;