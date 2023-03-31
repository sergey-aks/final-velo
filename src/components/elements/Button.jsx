const Button = ({ name, onClick, className, buttonType, disabled, title }) => {
    return (
        <button
            type={buttonType}
            onClick={onClick}
            className={className}
            disabled={disabled}
            title={title}
        >
            {name}
        </button>
    );
}

export default Button;