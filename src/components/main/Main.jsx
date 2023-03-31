import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePage from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ListOfSteals from './ListOfSteals';
import StealForm from './StealForm';
import StealFormPublic from './StealFormPublic';
import StealDetails from './StealDetails';
import OfficersList from './OfficersList';
import OfficerDetails from './OfficerDetails';

const Main = (props) => {

	const { userIsAuth } = props;

	return (
		<main className='main-wrapper'>
			<Routes>
				<Route path="/" exact element={<HomePage />} />
				<Route path="/auth/sign_in" element={<SignIn />} />
				<Route path="/auth/sign_up" element={<SignUp />} />
				{userIsAuth && (<Route path="/cases" element={<ListOfSteals />} />)}
				{userIsAuth ?
					(<Route path="/steal_form" element={<StealForm />} />)
					:
					(<Route path="/steal_form_public" element={<StealFormPublic />} />)}
				{userIsAuth && (<Route path="/cases/:id" element={<StealDetails />} />)}
				{userIsAuth && (<Route path="/officers" element={<OfficersList />} />)}
				{userIsAuth && (<Route path="/officers/:id" element={<OfficerDetails />} />)}
			</Routes>
		</main>
	)
}

export default connect((state) => {
	return {
		userIsAuth: state.authReducer.userIsAuth,
	};
})(Main);