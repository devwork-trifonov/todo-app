import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Home from "../static_pages/Home";
import Tour from "../static_pages/Tour";
import New from "../static_pages/New";
import Upgrade from "../static_pages/Upgrade";
import Help from "../static_pages/Help";
import Footer from "../static_pages/Footer";
import UnAuthenticateNav from "./UnAuthenticateNav";
import { LoginRegister } from "./LoginRegister";
import { Login } from "../forms/Login";
import { Register } from "../forms/Register";

export default function UnAuthenticateApp({ logIn, register }) {
	const withNavAndFooter = (Component) => {
		return (
			<>
				<UnAuthenticateNav />
				<Component />
				<Footer />
			</>
		);
	};
	const registerLink = {
		to: "/register",
		children: "Подписаться бесплатно",
	};
	const loginLink = {
		to: "/login",
		children: "Вход",
	};
	return (
		<Router>
			<Route exact path="/">
				{withNavAndFooter(Home)}
			</Route>
			<Route path="/app">
				<Redirect to="/" />
			</Route>
			<Route path="/tour">{withNavAndFooter(Tour)}</Route>
			<Route path="/new">{withNavAndFooter(New)}</Route>
			<Route path="/upgrade">{withNavAndFooter(Upgrade)}</Route>
			<Route path="/help">{withNavAndFooter(Help)}</Route>
			<Route path="/account">
				<Redirect to="/" />
			</Route>
			<Route path="/login">
				<LoginRegister
					Form={Login}
					link={registerLink}
					Message={LoginMessage}
					action={logIn}
				/>
			</Route>
			<Route path="/register">
				<LoginRegister
					Form={Register}
					link={loginLink}
					Message={RegisterMessage}
					action={register}
				/>
			</Route>
		</Router>
	);
}

function LoginMessage() {
	return (
		<>
			<p style={{ fontSize: "var(--fs-xx-lg)" }}>
				«Доверяя свои мечты и цели бумаге, вы начинаете превращаться в
				человека, которым больше всего хотели бы быть. Пусть ваше
				будущее будет в надежных руках — ваших собственных.»
			</p>
			<p style={{ fontSize: "var(--fs-lg)", opacity: 0.75 }}>
				— Марк Виктор Хансен
			</p>
		</>
	);
}

function RegisterMessage() {
	return (
		<>
			<div className="avatars">
				<div className="avatar"></div>
				<div className="avatar"></div>
				<div className="avatar"></div>
			</div>
			<p className="msg">
				Присоединяйтесь к миллионам людей ставшими более организованными
				и продуктивными!
			</p>
		</>
	);
}
