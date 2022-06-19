import './button.styles.scss';

const Button = ({ children, selected, ...otherProps }) => {
    return (
        <button className={`button ${selected}`} {...otherProps}>{children}</button>
    );
}

export default Button;