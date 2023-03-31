import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import Navigation from './Navigation'
import { logOut } from '../storage/authReducer';

import PopUpWindow from '../elements/PopUpWindow';

const Header = (props) => {

	const { logOut, userIsAuth } = props;
	const user = JSON.parse(localStorage.getItem("user"));
	const navigate = useNavigate();

	const userLogOutPopUp = () => {
		return (
			<PopUpWindow />
		)
	}

	const userLogOut = () => {
		logOut();
		navigate("/");
	}

	return (
		<header className='header'>
			<div className='logo'>
				<Link key='home' to={`/`}>
					<div className='logo-text'>Find Bicycle</div>
				</Link>
			</div>
			<Navigation
				userIsAuth={userIsAuth}
			/>
			<div className='registration'>
				{userIsAuth ?
					(
						<div className='user-name-wrapper'>
							<span className='user-name'>{user.user.firstName ? user.user.firstName : user.user.email}</span>
							<div key='log_out' onClick={userLogOutPopUp}>
								<PopUpWindow
									PopUpButtonName='Выйти'
									PopUpButtonClass='popup-button'
									PopUpOkClick={userLogOut}
									PopUpTitle='Вы хотите выйти?'
									PopUpOkText='Да'
									PopUpCanselText='Нет'
								/>
							</div>

						</div>
					)
					:
					(
						<Link key='sign_in' to={`/auth/sign_in`}>
							Войти
						</Link>
					)
				}

			</div>
		</header>
	)
}

export default connect(
	(state) => {
		return {
			userIsAuth: state.authReducer.userIsAuth
		};
	},
	(dispatch) => {
		return {
			logOut: () => dispatch(logOut()),
		};
	}
)(Header);
