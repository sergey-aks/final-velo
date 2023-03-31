import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const HomePage = (props) => {

    const { userIsAuth } = props;
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="home-page">
            <div className="home-page-cover"></div>
            <div className="container">
                {userIsAuth ?
                    (
                        <div>
                            <p>Сотрудник: <strong>{user.user.firstName} ({user.user.email})</strong></p>
                            <h1>Если Вы получили сообщение о пропаже велосипеда</h1>
                            <p>
                                Необходимо пройти по ссылке ниже и заполнить форму.
                            </p>
                        </div>
                    )
                    :
                    (
                        <div>
                            <h1>Если у вас пропал велосипед!</h1>
                            <p>
                                Не волнуйтесь, наша служба поиска поможет его найти.
                                <br />
                                Просто пройдите по ссылке ниже и заполните небольшую форму.
                            </p>
                        </div>
                    )
                }

                <div className="page-steal-link">
                    <Link key='page_steal_form' to={userIsAuth ? `/steal_form` : `/steal_form_public`}>
                        Сообщить о пропаже
                    </Link>
                </div>
            </div>
        </div >
    )
}

export default connect((state) => {
    return {
        userIsAuth: state.authReducer.userIsAuth,
    };
})(HomePage);