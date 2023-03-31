import { useEffect } from 'react'
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import uniqid from 'uniqid'

import { getAllCases, deleteCase } from '../storage/casesReducer';
import Message from '../elements/Message';
import PopUpWindow from '../elements/PopUpWindow';
import Loader from '../elements/Loader';

const ListOfSteals = (props) => {

  const navigate = useNavigate();

  const {
    cases,
    getAllCases,
    deleteCase,
    message,
    loadDone,
  } = props;

  useEffect(() => { getAllCases() }, [getAllCases]);

  const stealDetailsClick = (id, e) => {
    navigate(`/cases/${id}`);
    e.stopPropagation();
  };

  const deleteMessageClick = (id, e) => {
    deleteCase(id);
    e.stopPropagation();
  };

  const clickMessage = () => {
    navigate(`/`);
  };

  return (
    <div className="container">
      {loadDone ? (
        <div>
          <h1>Список пропавших велосипедов</h1>
          {message ? (
            <Message message={message} onClick={clickMessage} buttonName='На главную' />
          ) : (
            <div className='table-wrapper'>
              <table className="table-officers-list editable-table">
                <thead>
                  <tr key='thead'>
                    <th>#</th>
                    <th>Лиц. номер</th>
                    <th>
                      Тип
                    </th>
                    <th>
                      Цвет
                    </th>
                    <th>
                      Статус
                    </th>
                    <th>
                      Описание
                    </th>
                    <th>
                      Удалить
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {cases.map((steal, index) => {
                    return (
                      <tr
                        key={uniqid()}
                        onClick={(e) => stealDetailsClick(steal._id, e)}
                      >
                        <td>
                          {index + 1}
                        </td>

                        <td>
                          {steal.licenseNumber}
                        </td>

                        <td>
                          {(steal.type === "sport" && "Спорт") ||
                            (steal.type === "general" && "Обычный")}
                        </td>

                        <td>{steal.color}</td>

                        <td className={steal.status}>
                          <span>
                            {steal.status === 'new' && 'Новое'}
                            {steal.status === 'in_progress' && 'В процессе'}
                            {steal.status === 'done' && 'Завершено'}
                          </span>
                        </td>

                        <td>{steal.description}</td>
                        <td>
                          <PopUpWindow
                            PopUpButtonName='Удалить'
                            PopUpOkClick={(e) => deleteMessageClick(steal._id, e)}
                            PopUpTitle='Вы хотите удалить сообщение?'
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
          )}
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
      cases: state.casesReducer.cases,
      message: state.casesReducer.message,
      loadDone: state.casesReducer.loadDone,
    };
  },
  (dispatch) => {
    return {
      deleteCase: (id) => dispatch(deleteCase(id)),
      getAllCases: () => dispatch(getAllCases()),
    };
  }
)(ListOfSteals);