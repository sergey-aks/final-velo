import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";
import { connect, useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { getAllOfficers } from "../storage/officersReducer";
import { getOneCase, editCase } from '../storage/casesReducer';

import Button from '../elements/Button';
import Message from '../elements/Message';
import Loader from '../elements/Loader';

const StealDetails = (props) => {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        officers,
        getAllOfficers,
        editCase,
        bicycleType,
        caseStatus,
        caseIsUpdated,
        getOneCase,
        theCase,
        message,
        loadDone,
    } = props;

    useEffect(() => {
        getOneCase(id);
    }, [dispatch, getOneCase, id]);

    useEffect(() => {
        getAllOfficers();
    }, [getAllOfficers]);

    const goToAll = () => {
        navigate(`/cases`);
    };

    const [resolutionData, setResolutionData] = useState('');
    const resolutionOnChange = (e) => {
        setResolutionData(e.target.value)
    }

    const [fieldChange, setFieldChange] = useState(false);
    const fieldChanged = () => {
        setFieldChange(true);
    }

    return (
        <div className="container">
            {loadDone ? (
                <div>
                    <Button
                        name='Все пропажи'
                        buttonType="button"
                        onClick={goToAll}
                    />
                    <h1>Детали пропажи</h1>

                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            status: theCase.status || "",
                            licenseNumber: theCase.licenseNumber || "",
                            ownerFullName: theCase.ownerFullName || "",
                            type: theCase.type || "",
                            color: theCase.color || "",
                            officer: theCase.officer || "",
                            description: theCase.description || "",
                            resolution: theCase.resolution || "",
                        }}
                        validationSchema={Yup.object({
                            status: Yup.string(),
                            licenseNumber: Yup.string().required(
                                "Это поле является обязательным"
                            ),
                            ownerFullName: Yup.string().required(
                                "Это поле является обязательным"
                            ),

                        })}
                        onSubmit={(values) => {
                            values.resolution = resolutionData
                            editCase(theCase._id, values);
                        }}
                    >
                        {(formik) => {
                            const { values } = formik;
                            return (
                                <div className='form-wpapper'>
                                    <Form onChange={fieldChanged}>
                                        <div className="table-wrapper">
                                            <table className="table-officers-list">
                                                <thead>
                                                    <tr>
                                                        <th colSpan="2">
                                                            <div>
                                                                Создано:{" "}
                                                                {new Date(
                                                                    theCase.createdAt
                                                                ).toLocaleDateString()}{" "}
                                                                в{" "}
                                                                {new Date(
                                                                    theCase.createdAt
                                                                ).toLocaleTimeString()}
                                                            </div>
                                                            {theCase && (
                                                                <div>
                                                                    {!theCase.updatedAt
                                                                        ? "Не редактировалось"
                                                                        : `Было отредактировано ${new Date(
                                                                            theCase.updatedAt
                                                                        ).toLocaleDateString()} в ${new Date(
                                                                            theCase.updatedAt
                                                                        ).toLocaleTimeString()}`}
                                                                </div>
                                                            )}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Статус</td>
                                                        <td>
                                                            <Field
                                                                as="select"
                                                                name="status"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <option value="default">
                                                                    Выберите...
                                                                </option>
                                                                {caseStatus &&
                                                                    caseStatus.map((item, index) => {
                                                                        return (
                                                                            <option value={item.value} key={index}>
                                                                                {item.title}
                                                                            </option>
                                                                        );
                                                                    })}
                                                            </Field>
                                                        </td>
                                                    </tr>

                                                    {values.status === "done" && (
                                                        <tr>
                                                            <td>Решение</td>
                                                            <td>
                                                                <textarea
                                                                    name="resolution"
                                                                    placeholder="Опишите как был решён случай"
                                                                    defaultValue={values.resolution}
                                                                    required
                                                                    onChange={resolutionOnChange}
                                                                >

                                                                </textarea>
                                                            </td>
                                                        </tr>
                                                    )}

                                                    <tr >
                                                        <td>Лицензионный номер</td>
                                                        <td>
                                                            <Field
                                                                type="text"
                                                                name="licenseNumber"
                                                                placeholder="Введите лицензионный номер"
                                                                onClick={(e) => e.stopPropagation()}
                                                            />
                                                            <ErrorMessage
                                                                name="licenseNumber"
                                                                component="div"
                                                                className="error-message"
                                                            />
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>ФИО пользователя</td>
                                                        <td>
                                                            <Field
                                                                type="text"
                                                                name="ownerFullName"
                                                                placeholder="ФИО пользователя"
                                                                onClick={(e) => e.stopPropagation()}
                                                            />
                                                            <ErrorMessage
                                                                name="ownerFullName"
                                                                component="div"
                                                                className="error-message"
                                                            />
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>Тип велосипеда</td>
                                                        <td>
                                                            <Field
                                                                as="select"
                                                                name="type"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <option value="default" disabled>
                                                                    Выберите...
                                                                </option>
                                                                {bicycleType &&
                                                                    bicycleType.map((item, index) => {
                                                                        return (
                                                                            <option value={item.value} key={index}>
                                                                                {item.title}
                                                                            </option>
                                                                        );
                                                                    })}
                                                            </Field>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>Цвет велосипеда</td>
                                                        <td>
                                                            <Field
                                                                type="text"
                                                                name="color"
                                                                placeholder="Цвет велосипеда"
                                                                onClick={(e) => e.stopPropagation()}
                                                            />
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>Сотрудник</td>
                                                        <td>
                                                            <Field
                                                                as="select"
                                                                name="officer"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <option value="">Выберите...</option>
                                                                {officers
                                                                    .filter((officer) => officer.approved)
                                                                    .map((officer) => {
                                                                        return (
                                                                            <option
                                                                                key={officer._id}
                                                                                value={officer._id}
                                                                            >
                                                                                {!officer.firstName ||
                                                                                    !officer.lastName
                                                                                    ? `Сотрудник ${officer._id}`
                                                                                    : `${officer.firstName} ${officer.lastName}`}
                                                                            </option>
                                                                        );
                                                                    })}
                                                            </Field>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>Описание</td>
                                                        <td>
                                                            <Field
                                                                as="textarea"
                                                                name="description"
                                                                placeholder="Опишите случай"
                                                                onClick={(e) => e.stopPropagation()}
                                                            />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className='save-button-wrapper'>
                                            <Button
                                                name="Сохранить изменения"
                                                buttonType="submit"
                                                disabled={!fieldChange ? true : false}
                                            />
                                        </div>
                                    </Form>
                                    {caseIsUpdated && (
                                        <div className='officer-updated'>
                                            Детали пропажи обновлены
                                        </div>
                                    )}
                                    {message && <Message message={message} />}
                                </div>
                            );
                        }}
                    </Formik>
                </div>
            )
                :
                (<Loader />)}
        </div>
    )
}

export default connect(
    (state) => {
        return {
            officers: state.officersReducer.officers,
            theCase: state.casesReducer.case,
            caseIsUpdated: state.casesReducer.caseIsUpdated,
            caseStatus: state.casesReducer.bicycle.caseStatus,
            bicycleType: state.casesReducer.bicycle.bicycleType,
            message: state.casesReducer.message,
            loadDone: state.casesReducer.loadDone,
        };
    },
    (dispatch) => {
        return {
            getAllOfficers: () => dispatch(getAllOfficers()),
            getOneCase: (id) => dispatch(getOneCase(id)),
            editCase: (id, values) => dispatch(editCase(id, values)),
        };
    }
)(StealDetails);