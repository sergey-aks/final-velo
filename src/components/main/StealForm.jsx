import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";
import { connect } from 'react-redux';
import uniqid from 'uniqid'

import { createCase } from '../storage/casesReducer';
import { getAllOfficers } from '../storage/officersReducer';
import Button from '../elements/Button';
import Message from '../elements/Message';
import MessageSuccess from "../elements/MessageSuccess";


const StealForm = (props) => {

    const navigate = useNavigate();

    const {
        officers,
        bicycleType,
        getAllOfficers,
        createCase,
        message,
        caseIsCreated,
    } = props;

    useEffect(() => {
        getAllOfficers();
    }, [getAllOfficers]);

    const clickMessage = () => {
        navigate(`/`);
    };

    const gotoClick = () => {
        navigate(`/cases`);
    };

    return (
        <div className="container">
            <h1>Сообщить о пропаже (для сотрудников)</h1>
            <div className='form-wrapper'>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        licenseNumber: "",
                        ownerFullName: "",
                        type: "",
                        color: "",
                        date: "",
                        officer: "",
                        description: "",
                        agreement: false,
                    }}
                    validationSchema={Yup.object({
                        licenseNumber: Yup.string().required("обязательное поле"),
                        ownerFullName: Yup.string().required("обязательное поле"),
                        type: Yup.string().required("обязательное поле"),
                        color: Yup.string(),
                        date: Yup.date(),
                        officer: Yup.string(),
                        description: Yup.string(),
                        agreement: Yup.boolean().oneOf(
                            [true],
                            "Необходимо согласться с условиями"
                        ),
                    })}
                    onSubmit={(values) => {
                        createCase(values);
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
                                                <label
                                                    htmlFor="ownerFullName"
                                                >
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
                                                    <option value="">Выберите...</option>

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
                                                <label htmlFor="officer">
                                                    Сотрудник:
                                                </label>
                                                <Field
                                                    as="select"
                                                    name="officer"
                                                    id="officer"
                                                >
                                                    <option value="">Выберите...</option>

                                                    {officers
                                                        .filter((officer) => officer.approved)
                                                        .map((officer) => {
                                                            return (
                                                                <option key={uniqid()} value={officer._id}>
                                                                    {!officer.firstName || !officer.lastName
                                                                        ? `Сотрудник ${!officer.firstName && !officer.lastName
                                                                            ? officer._id
                                                                            : officer.firstName ||
                                                                            officer.lastName
                                                                        }`
                                                                        : `${officer.firstName} ${officer.lastName}`}
                                                                </option>
                                                            );
                                                        })}
                                                </Field>
                                            </div>

                                            <div className='label-wrapper'>
                                                <label
                                                    htmlFor="description"
                                                >
                                                    Описание:
                                                </label>
                                                <Field
                                                    as="textarea"
                                                    name="description"
                                                    id="description"
                                                    placeholder="Опишите велосипед"
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
                                                    className="error-message"
                                                    component="div"
                                                />
                                            </div>

                                            <div>
                                                <Button
                                                    name="Сообщить о пропаже"
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
                                        buttonName="Все пропажи"
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
            getAllOfficers: () => dispatch(getAllOfficers()),
            createCase: (values) => dispatch(createCase(values)),
        };
    }
)(StealForm);