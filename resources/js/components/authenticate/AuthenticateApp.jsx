import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Tour from "../static_pages/Tour";
import New from "../static_pages/New";
import Upgrade from "../static_pages/Upgrade";
import Help from "../static_pages/Help";
import Account from "../account/Account";
import Footer from "../static_pages/Footer";
import AuthenticateNav from "./AuthenticateNav";
import Todos from "../../containers/Todos";

export default function AuthenticateApp({
	user,
	updatePhoto,
	logout,
	resetPasswordMessage,
	setPassword,
	password,
}) {
	return (
		<Router>
			<Route exact path="/">
				<Redirect to="/app/all" />
			</Route>
			<Route exact path="/app">
				<Redirect to="/app/all" />
			</Route>
			<Route path="/login">
				<Redirect to="/app/all" />
			</Route>
			<Route path="/register">
				<Redirect to="/app/all" />
			</Route>
			<Route path="/app/:list">
				<Todos />
			</Route>
			<Route path="/todos">
				<Redirect to="/app" />
			</Route>
			<Route path="/tour">
				<AuthenticateNav user={user} logout={logout} />
				<Tour />
				<Footer />
			</Route>
			<Route path="/new">
				<AuthenticateNav user={user} logout={logout} />
				<New />
				<Footer />
			</Route>
			<Route path="/upgrade">
				<AuthenticateNav user={user} logout={logout} />
				<Upgrade />
				<Footer />
			</Route>
			<Route path="/help">
				<AuthenticateNav user={user} logout={logout} />
				<Help />
				<Footer />
			</Route>
			<Route path="/account">
				<AuthenticateNav user={user} logout={logout} />
				<Account
					user={user}
					updatePhoto={updatePhoto}
					resetPasswordMessage={resetPasswordMessage}
					setPassword={setPassword}
					password={password}
				/>
				<Footer />
			</Route>
		</Router>
	);
}
