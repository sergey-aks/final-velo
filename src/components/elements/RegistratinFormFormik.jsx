import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import Message from './Message';
import MessageSuccess from './MessageSuccess';
import { signUp } from '../storage/authReducer';
import { getAllOfficers } from '../storage/officersReducer';

const RegistratinForm = (props) => {

    const {
        signUp,
        isRegistered,
        messageAuth,
        message,
    } = props;

    const navigate = useNavigate();

    const gotoClick = () => {
        navigate(`/auth/sign_in`);
    };

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
                clientId: "",
                firstName: "",
                lastName: "",
                agreement: false,
            }}

            validationSchema={Yup.object({
                password: Yup.string()
                    .min(3, "Пароль должен быть не менее 3 символов")
                    .max(12, "Пароль должен быть меньше 12 символов")
                    .required("обязательное поле"),
                clientId: Yup.string().required("обязательное поле"),
                email: Yup.string()
                    .email("Неверный email адрес")
                    .required("обязательное поле"),
                firstName: Yup.string().max(10, "Это поле должено содержать меньше 10 символов"),
                lastName: Yup.string().max(10, "Это поле должено содержать меньше 10 символов"),
                agreement: Yup.boolean().oneOf(
                    [true],
                    "Необходимо согласться с условиями"
                ),
            })}

            onSubmit={(values) => {
                signUp(values);
            }}
        >
            {() => {
                return (
                    <div className='reg-form'>
                        {isRegistered ? (
                            <MessageSuccess
                                messageSuccessTitle="Пользователь создан"
                                messageSuccessText="Регистрация успешно пройдена"
                                buttonName="Войти"
                                onClick={gotoClick}
                            />
                        ) : (
                            <Form>
                                <div className='label-wrapper'>
                                    <label htmlFor="email">
                                        E-mail*:
                                    </label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="name@example.com"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="error-message"
                                    />
                                </div >

                                <div className='label-wrapper'>
                                    <label htmlFor="password">
                                        Пароль*:
                                    </label>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Пароль"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="error-message"
                                    />
                                </div>

                                <div className='label-wrapper'>
                                    <label htmlFor="firstName">
                                        Имя:
                                    </label>
                                    <Field
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        placeholder="Имя"
                                    />
                                </div >

                                <div className='label-wrapper'>
                                    <label htmlFor="lastName">
                                        Фамилия:
                                    </label>
                                    <Field
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Фамилия"
                                    />
                                </div >


                                <div className='label-wrapper'>
                                    <label htmlFor="clientId">
                                        ID клиента*:
                                    </label>
                                    <Field
                                        type="text"
                                        id="clientId"
                                        name="clientId"
                                        placeholder="ID клиента"
                                    />
                                    <ErrorMessage
                                        name="clientId"
                                        component="div"
                                        className="error-message"
                                    />
                                </div >

                                <div className='label-wrapper'>
                                    <div className='agreement-wrapper'>
                                        <Field
                                            type="checkbox"
                                            name="agreement"
                                            id="agreement"
                                        />
                                        <label htmlFor="agreement">
                                            Я согласен с условиями и правилами
                                        </label>
                                    </div >
                                    <ErrorMessage
                                        name="agreement"
                                        component="div"
                                        className="error-message"
                                    />
                                </div >

                                <Button
                                    name='Регистрация'
                                    buttonType="submit"
                                />
                            </Form>
                        )}
                        {message && <Message message={message} />}
                        {messageAuth && <Message message={messageAuth} />}
                    </div >
                )
            }}
        </Formik>
    );
}

export default connect(
    (state) => {
        return {
            isRegistered: state.authReducer.isRegistered,
            messageAuth: state.authReducer.message,
            message: state.officersReducer.message,
        };
    },
    (dispatch) => {
        return {
            signUp: (values) => dispatch(signUp(values)),
            getAllOfficers: () => dispatch(getAllOfficers()),
        };
    }
)(RegistratinForm);