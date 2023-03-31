import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from 'formik'
import { connect, useDispatch, useSelector } from 'react-redux';

import Button from '../elements/Button';
import { editOfficer, getOneOfficer } from '../storage/officersReducer';
import Message from '../elements/Message';
import Loader from '../elements/Loader';

const OfficerDetails = (props) => {

  const {
    getOneOfficer,
    officer,
    editOfficer,
    officerIsUpdated,
    message,
    loadDone,
  } = props;

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getOneOfficer(id);

  }, [dispatch, getOneOfficer, id]
  );

  let officerApproved = useSelector(state => state.officersReducer.officer.approved);
  const [fieldChange, setFieldChange] = useState(false);

  const gotoAllClick = () => {
    navigate(`/officers`);
  };

  const initialVal = {
    firstName: officer.firstName,
    lastName: officer.lastName,
    approved: officer.approved,
  };

  const approveChange = (e) => {
    !officerApproved ? e.target.innerText = 'Да' : e.target.innerText = 'Нет';
    !officerApproved ? e.target.setAttribute('title', 'отменить одобрение') : e.target.setAttribute('title', 'одобрить');
    !officerApproved ? e.target.classList.remove('not-approved') : e.target.classList.add('not-approved');
    !officerApproved ? officerApproved = true : officerApproved = false;
    fieldChanged();
  }

  const fieldChanged = () => {
    setFieldChange(true);
  }

  return (
    <div className="container">
      {loadDone ? (
        <div>
          <Button
            name='Все сотрудники'
            buttonType="submit"
            onClick={gotoAllClick}
          />
          <h1>Сотрудник</h1>

          <Formik
            enableReinitialize={true}
            initialValues={{
              firstName: initialVal.firstName || '',
              lastName: initialVal.lastName || "",
            }}
            onSubmit={(values) => {
              values.approved = !officerApproved;
              editOfficer(officer._id, values);
            }}
          >
            {() => {
              return (
                <div>
                  {message ? (
                    <Message message={message} onClick={gotoAllClick} buttonName='На главную' />
                  ) : (
                    <Form onChange={fieldChanged}>
                      <div className="table-wrapper">
                        <table className="table-officers-list">
                          <tbody>
                            <tr>
                              <td>Имя</td>
                              <td>
                                <Field
                                  type="text"
                                  name="firstName"
                                />
                              </td>
                            </tr>

                            <tr>
                              <td>Фамилия</td>
                              <td>
                                <Field
                                  type="text"
                                  name="lastName"
                                />
                              </td>
                            </tr>

                            <tr>
                              <td>E-mail</td>
                              <td>{officer.email}</td>
                            </tr>

                            <tr>
                              <td>ID</td>
                              <td>{officer._id}</td>
                            </tr>

                            <tr>
                              <td>Одобрен</td>
                              <td>
                                <div >
                                  <Button
                                    name={officerApproved ? 'Да' : 'Нет'}
                                    buttonType="button"
                                    onClick={approveChange}
                                    className={officerApproved ? '' : 'not-approved'}
                                    title={officerApproved ? 'отменить одобрение' : 'одобрить'}
                                  />
                                </div>
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
                  )}
                  {officerIsUpdated && (
                    <div className='officer-updated'>
                      Данные сотрудника обновлены
                    </div>
                  )}
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
      officer: state.officersReducer.officer,
      officerIsUpdated: state.officersReducer.officerIsUpdated,
      loadDone: state.officersReducer.loadDone,
      message: state.officersReducer.message,
    };
  },
  (dispatch) => {
    return {
      getOneOfficer: (id) => dispatch(getOneOfficer(id)),
      editOfficer: (id, values) => dispatch(editOfficer(id, values)),
    };
  }
)(OfficerDetails);