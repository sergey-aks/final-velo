import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthForm from "../elements/AuthForm";

const SignIn = (props) => {

    const {userIsAuth} = props;

    return (
        <>
            <div className='form-wrapper'>
                <AuthForm />
                {!userIsAuth &&
                    (<div className="page-link no-reg">
                        <Link key='sign_up' to={`/auth/sign_up`}>
                            У вас нет аккаунта?
                        </Link>
                    </div>)
                }
            </div>

        </>
    )
}

// export default SignIn;

export default connect ((state)=>{
	return{
		userIsAuth: state.authReducer.userIsAuth,
	};
})(SignIn);