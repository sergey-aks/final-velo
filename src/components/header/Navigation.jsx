import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navigation = (props) => {
    const { userIsAuth } = props;

    const [active, setActive] = useState(false)

    const showMenu = () => {
        !active ? setActive(true) : setActive(false)
    }

    return (
        <div className='nav-wrapper'>
            <button className='show-nav' onClick={showMenu}>
                <div className="icon-bar"></div>
                <div className="icon-bar"></div>
                <div className="icon-bar"></div>
            </button>
            <nav className={active ? "nav active" : "nav"}>
                {userIsAuth && (<span>
                    <Link key='steal_list_cases' to={`/cases`}>
                        Пропажи
                    </Link>
                </span>)}
                <span>
                    <Link key='steal_form' to={userIsAuth ? `/steal_form` : `/steal_form_public`}>
                        Сообщить о пропаже
                    </Link>
                </span>
                {userIsAuth && (<span>
                    <Link key='officers' to={`/officers`}>
                        Ответственные сотрудники
                    </Link>
                </span>)}
            </nav>
        </div>
    )
}

export default Navigation;