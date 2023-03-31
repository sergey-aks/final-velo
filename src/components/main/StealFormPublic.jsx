import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";
import { connect } from 'react-redux';
import uniqid from 'uniqid'

import { createCasePublic } from '../storage/casesReducer';
import Button from '../elements/Button';
import Message from '../elements/Message';
import MessageSuccess from "../elements/MessageSuccess";

const StealFormPublic = (props) => {

    const {
        message,
        caseIsCreated,
        createCasePublic,
        bicycleType,
    } = props;

    const navigate = useNavigate();

    const clickMessage = () => {
        navigate(`/`);
    };

    const gotoClick = () => {
        navigate(`/`);
    };

    return (
        <div className="container">
            <h1>Сообщение о краже</h1>
            <div className='form-wrapper'>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        licenseNumber: "",
                        ownerFullName: "",
                        type: "",
                        clientId: "",
                        color: "",
                        date: "",
                        description: "",
                        agreement: false,
                    }}
                    validationSchema={Yup.object({
                        licenseNumber: Yup.string().required("обязательное поле"),
                        ownerFullName: Yup.string().required("обязательное поле"),
                        type: Yup.string().required("обязательное поле"),
                        clientId: Yup.string().required("обязательное поле"),
                        color: Yup.string(),
                        date: Yup.date(),
                        description: Yup.string(),
                        agreement: Yup.boolean().oneOf(
                            [true],
                            "Необходимо согласться с условиями"
                        ),
                    })}
                    onSubmit={(values) => {
                        createCasePublic(values);
                    }}
                >
                    {() => {
                        return (
                            <div className='reg-form'>
                                {message ? (
                                    <Message message={message} onClick={clickMessage} buttonName='На главную' />
                                ) : (
                                    <div>
                                        <Form>
                                            <div className='label-wrapper'>
                                                <label htmlFor="licenseNumber">
                                                    Номер лицензии*:
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="licenseNumber"
                                                    placeholder="Номер лицензии"
                                                    id="licenseNumber"
                                                />
                                                <ErrorMessage
                                                    name="licenseNumber"
                                                    className="error-message"
                                                    component="div"
                                                />
                                            </div>

                                            <div className='label-wrapper'>
                                                <label htmlFor="ownerFullName">
                                                    ФИО клиента*:
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="ownerFullName"
                                                    placeholder="ФИО клиента"
                                                    id="ownerFullName"
                                                />
                                                <ErrorMessage
                                                    name="ownerFullName"
                                                    className="error-message"
                                                    component="div"
                                                />
                                            </div>

                                            <div className='label-wrapper'>
                                                <label htmlFor="type">
                                                    Тип велосипеда*:
                                                </label>
                                                <Field
                                                    as="select"
                                                    name="type"
                                                    id="type"
                                                >
                                                    <option value="default" disabled>
                                                        Выберите...
                                                    </option>
                                                    {bicycleType &&
                                                        bicycleType.map((item, index) => {
                                                            return (
                                                                <option value={item.value} key={uniqid()}>
                                                                    {item.title}
                                                                </option>
                                                            );
                                                        })}
                                                </Field>
                                                <ErrorMessage
                                                    name="type"
                                                    className="error-message"
                                                    component="div"
                                                />
                                            </div>

                                            <div className='label-wrapper'>
                                                <label htmlFor="color">
                                                    Цвет велосипеда:
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="color"
                                                    placeholder="Цвет велосипеда"
                                                    id="color"
                                                />
                                            </div>

                                            <div className='label-wrapper'>
                                                <label htmlFor="date">
                                                    Дата пропажи:
                                                </label>
                                                <Field
                                                    type="date"
                                                    name="date"
                                                    id="date"
                                                />
                                            </div>

                                            <div className='label-wrapper'>
                                                <label htmlFor="description">
                                                    Дополнительная информация:
                                                </label>
                                                <Field
                                                    as="textarea"
                                                    name="description"
                                                    id="description"
                                                    placeholder="Дополнительная информация"
                                                />
                                            </div>
                                            
                                            <div className='label-wrapper'>
                                                <label
                                                    htmlFor="clientId"
                                                >
                                                    ID клиента*:
                                                </label>
                                                <div>
                                                    <Field
                                                        type="text"
                                                        name="clientId"
                                                        id="clientId"
                                                    />
                                                </div>
                                                <ErrorMessage
                                                    name="clientId"
                                                    component="div"
                                                    className="error-message"
                                                />
                                            </div>

                                            <div className='label-wrapper'>
                                                <div>
                                                    <Field
                                                        type="checkbox"
                                                        name="agreement"
                                                        id="agreement"
                                                    />
                                                    <label
                                                        htmlFor="agreement"
                                                    >
                                                        Согласиться с условиями и правилами
                                                    </label>
                                                </div>
                                                <ErrorMessage
                                                    name="agreement"
                                                    component="div"
                                                    className="error-message"
                                                />
                                            </div>

                                            <div className='save-button-wrapper'>
                                                <Button
                                                    name="Сохранить изменения"
                                                    buttonType="submit"
                                                />
                                            </div>
                                        </Form>
                                    </div>
                                )}

                                {caseIsCreated && (
                                    <MessageSuccess
                                        messageSuccessTitle="Сообщение создано"
                                        messageSuccessText="Данные отправлены"
                                        buttonName="На главную"
                                        onClick={gotoClick}
                                    />
                                )}
                            </div>
                        );
                    }}
                </Formik>
            </div>
        </div>
    )
}

export default connect(
    (state) => {
        return {
            officers: state.officersReducer.officers,
            bicycleType: state.casesReducer.bicycle.bicycleType,
            message: state.casesReducer.message,
            caseIsCreated: state.casesReducer.caseIsCreated,
        };
    },
    (dispatch) => {
        return {
            createCasePublic: (values) => dispatch(createCasePublic(values)),
        };
    }
)(StealFormPublic);