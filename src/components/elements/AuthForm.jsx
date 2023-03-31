import Button from "./Button";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";

import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import Message from './Message';
import MessageSuccess from './MessageSuccess';
import { signIn } from '../storage/authReducer';

const AuthForm = (props) => {
    const {
        userIsAuth,
        signIn,
        message
    } = props;

    const navigate = useNavigate();

    const goToHomeButton = () => {
        navigate(`/`);
    };

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            validationSchema={Yup.object({
                email: Yup.string()
                    .email("Пожалуйста введите правильный e-mail адрес")
                    .required("обязательное поле"),
                password: Yup.string()
                    .min(3, "Пароль должен содержать более 3 символов")
                    .max(12, "Пароль должен содержать менее 12 символов")
                    .required("обязательное поле"),
            })}
            onSubmit={(values) => {
                signIn(values);
            }}
        >
            {() => {
                return (
                    <div className='reg-form'>
                        {userIsAuth ? (
                            <MessageSuccess
                                messageSuccessTitle="Привет!"
                                userName={user.user.firstName ? user.user.firstName : 'неизвестный друг'}
                                messageSuccessText="Авторизация успешно пройдена"
                                buttonName="на главную"
                                onClick={goToHomeButton}
                            />
                        ) : (
                            <Form >
                                <div className='label-wrapper'>
                                    <label htmlFor="email">
                                        E-mail:
                                    </label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        autoComplete="e-mail"
                                        placeholder="name@example.com"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        className="error-message"
                                        component="div"
                                    />
                                </div>

                                <div className='label-wrapper'>
                                    <label htmlFor="password">
                                        Пароль:
                                    </label>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        autoComplete="on"
                                        placeholder="Пароль"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        className="error-message"
                                        component="div"
                                    />
                                    <div className="error-message">{message}</div>
                                </div>

                                <Button
                                    name="Войти"
                                    buttonType="submit"
                                />
                            </Form>
                        )}
                        {message && <Message message={message} />}
                    </div>
                );
            }}
        </Formik>
    );
};

export default connect(
    (state) => {
        return {
            userIsAuth: state.authReducer.userIsAuth,
            message: state.authReducer.message,
        };
    },
    (dispatch) => {
        return {
            signIn: (values) => dispatch(signIn(values)),
        };
    }
)(AuthForm);