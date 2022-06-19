import './options-bar.styles.scss';

const OptionsBar = ({ children, optionType }) => {
    return <div className={`options-bar ${optionType}`}>
        {children}
    </div>
}

export default OptionsBar;