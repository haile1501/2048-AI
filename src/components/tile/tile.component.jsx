import './tile.styles.scss';

const Tile = ({ value }) => {
    return (
        <div className={`tile value${value}`}>
            {value ? value : ""}
        </div>
    );
}

export default Tile;