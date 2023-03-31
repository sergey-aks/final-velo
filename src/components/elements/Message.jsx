import Button from "./Button";

const Message = (props) => {
  const { message, onClick, buttonName } = props;
  return (
    <div className="message-wrapper">
      <h3>{message}</h3>
      {onClick &&
        <Button
          name={buttonName}
          buttonType="button"
          onClick={onClick}
        />
      }

    </div>
  );
};

export default Message;