import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import uniqid from 'uniqid'

import { getAllOfficers, deleteOfficer } from "../storage/officersReducer";
import PopUpWindow from '../elements/PopUpWindow';
import Message from "../elements/Message";
import Loader from '../elements/Loader';

const OfficersList = (props) => {
    const {
        officers,
        getAllOfficers,
        deleteOfficer,
        message,
        loadDone,
    } = props;

    const navigate = useNavigate();

    useEffect(() => { getAllOfficers() }, [getAllOfficers]);

    const gotoDetailClick = (id, e) => {
        navigate(`/officers/${id}`);
    };

    const handleButtonClick = (id, e) => {
        deleteOfficer(id);
        e.stopPropagation();
    };

    const clickMessage = () => {
        navigate(`/`);
    };

    return (
        <div>
            {loadDone ? (
                <div>
                    {message ? (
                        <Message message={message} onClick={clickMessage} buttonName='На главную' />
                    ) : (
                        <div className="container">
                            <h1>Ответственные сотрудники</h1>
                            <div className="table-wrapper">
                                <table className="table-officers-list editable-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Имя, Фамилия</th>
                                            <th>E-mail</th>
                                            <th>Одобрен</th>
                                            <th>Удалить</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {officers &&
                                            officers.map((officer, index) => {
                                                return (
                                                    <tr
                                                        key={uniqid()}
                                                        onClick={(e) => gotoDetailClick(officer._id, e)}
                                                    >
                                                        <td >
                                                            {index + 1}
                                                        </td>
                                                        <td>
                                                            {!officer.firstName || !officer.lastName
                                                                ? `неизвестный друг`
                                                                : `${officer.firstName && officer.lastName
                                                                    ? `${officer.firstName} ${officer.lastName}`
                                                                    : `${officer.firstName || officer.lastName}`
                                                                }`}
                                                        </td>
                                                        <td>{officer.email}</td>
                                                        <td>
                                                            <div
                                                                className='approved-wrapper'
                                                            >
                                                                {officer.approved ?
                                                                    <span className="yes">Да</span>
                                                                    :
                                                                    'Нет'
                                                                }
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <PopUpWindow
                                                                PopUpButtonName='Удалить'
                                                                PopUpOkClick={(e) => handleButtonClick(officer._id, e)}
                                                                PopUpTitle='Вы хотите удалить сотрудника?'
                                                                PopUpOkText='Да'
                                                                PopUpCanselText='Нет'
                                                            />
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )
                :
                (<Loader />)}
        </div>
    );
};
export default connect(
    (state) => {
        return {
            officers: state.officersReducer.officers,
            message: state.officersReducer.message,
            loadDone: state.officersReducer.loadDone,
        };
    },
    (dispatch) => {
        return {
            getAllOfficers: () => dispatch(getAllOfficers()),
            deleteOfficer: (id) => dispatch(deleteOfficer(id)),
        };
    }
)(OfficersList);
