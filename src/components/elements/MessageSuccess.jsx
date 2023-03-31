import Button from "./Button";

const MessageSuccess = (props) => {
    const {
        messageSuccessTitle,
        messageSuccessText,
        buttonName,
        onClick,
        userName
    } = props;
    return (
        <div className="message-success-wrapper">
            <h4>{messageSuccessTitle}</h4>
            <h2>{userName}</h2>
            <p>{messageSuccessText}</p>
            <Button
                name={buttonName}
                buttonType="button"
                onClick={onClick}
            />
        </div>
    );
};
export default MessageSuccess;