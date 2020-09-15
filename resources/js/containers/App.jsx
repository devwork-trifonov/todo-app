import React, { Suspense } from "react";
import { connect } from "react-redux";

import {
	logoutUser,
	updatePhoto,
	setPassword,
	resetPasswordMessage,
	logIn,
	register,
} from "../actions/user";

window.moment = require("moment");

function App(props) {
	const {
		isFetchingUser,
		updatePhoto,
		isAuthenticate,
		userData,
		logoutUser,
		password,
		logIn,
		register,
	} = props;
	const AuthenticateApp = React.lazy(() =>
		import("../components/authenticate/AuthenticateApp")
	);
	const UnAuthenticateApp = React.lazy(() =>
		import("../components/unauthenticate/UnAuthenticateApp")
	);

	if (isFetchingUser) {
		return <h2>Loading...</h2>;
	} else if (!isFetchingUser && isAuthenticate) {
		return (
			<Suspense fallback={<h2>Loading...</h2>}>
				<AuthenticateApp
					user={userData}
					updatePhoto={updatePhoto}
					logout={logoutUser}
					resetPasswordMessage={props.resetPasswordMessage}
					setPassword={props.setPassword}
					password={password}
				/>
			</Suspense>
		);
	} else if (!isFetchingUser && !isAuthenticate) {
		return (
			<Suspense fallback={<h2>Loading...</h2>}>
				<UnAuthenticateApp logIn={logIn} register={register} />
			</Suspense>
		);
	}
}

function mapStateToProps(state) {
	const { user } = state;
	const { isFetchingUser, isAuthenticate, userData, password } = user;

	return {
		isFetchingUser,
		isAuthenticate,
		userData,
		password,
	};
}

const mapDispatchToProps = (dispatch) => ({
	logoutUser: (token) => dispatch(logoutUser(token)),
	updatePhoto: (blob, token) => dispatch(updatePhoto(blob, token)),
	setPassword: (data, token) => dispatch(setPassword(data, token)),
	resetPasswordMessage: () => dispatch(resetPasswordMessage()),
	logIn: (data, token) => dispatch(logIn(data, token)),
	register: (data) => dispatch(register(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
