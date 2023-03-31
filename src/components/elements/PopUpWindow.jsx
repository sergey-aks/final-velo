import Popup from 'reactjs-popup';

import Button from './Button';

const PopUpWindow = (props) => {
    const {
        PopUpButtonName,
        PopUpOkClick,
        PopUpTitle,
        PopUpButtonClass,
        PopUpText,
        PopUpOkText,
        PopUpCanselText
    } = props;

    return (
        <Popup
            trigger={<button className={PopUpButtonClass}> {PopUpButtonName} </button>}
            modal
            nested
        >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header">{PopUpTitle}</div>
                    <div className="content">
                        {PopUpText}
                    </div>
                    <div className="popup-actions">
                        <Button
                            name={PopUpOkText}
                            buttonType="button"
                            onClick={PopUpOkClick}
                            className='popup-button-ok'
                        />
                        <Button
                            name={PopUpCanselText}
                            buttonType="button"
                            onClick={() => {
                                close();
                            }}
                            className='popup-button-no'
                        />
                    </div>
                </div>
            )}
        </Popup>
    )
};

export default PopUpWindow;