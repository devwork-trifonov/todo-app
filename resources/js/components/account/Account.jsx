import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Link,
	useLocation,
} from "react-router-dom";

import Profile from "./Account.Profile";
import ChangePassword from "./Account.ChangePassword";
import DeleteProfile from "./Account.DeleteProfile";
import ChangePhoto from "./Account.ChangePhoto";

export default function Account({
	user,
	updatePhoto,
	password,
	setPassword,
	resetPasswordMessage,
}) {
	let [pathname, setPathname] = useState(useLocation().pathname);

	useEffect(() => {
		if (pathname.endsWith("/")) {
			setPathname(pathname.slice(0, -1));
		}
	});

	let canvasPropsObject = {
		imgWidth: 0,
		imgHeight: 0,
		canvWidth: 0,
		canvHeight: 0,
		sx: 0,
		sy: 0,
		sxRatio: 0,
		syRatio: 0,
		sWidth: 0,
		sHeight: 0,
		dx: 0,
		dy: 0,
		dxWhenMouseDown: 0,
		dyWhenMouseDown: 0,
		dWidth: 0,
		dHeight: 0,
		mouseClickOffsetX: 0,
		mouseClickOffsetY: 0,
		src: "",
		get props() {
			return this;
		},
	};

	function Links({ links }) {
		return links.map((link) => {
			return (
				<li key={link.key}>
					<Link
						onClick={() => setPathname(link.path)}
						to={{ pathname: `${link.path}` }}
						className={
							`${link.path}` === pathname
								? "account-sidebar__link account-sidebar__link_active"
								: "account-sidebar__link"
						}
					>
						{link.children}
					</Link>
				</li>
			);
		});
	}

	let links = [
		{
			path: "/account",
			key: 1,
			children: "Обзор",
		},
		{
			path: "/account/password",
			key: 2,
			children: "Изменить пароль",
		},
		{
			path: "/account/avatar",
			key: 3,
			children: "Сменить фото",
		},
		{
			path: "/account/delete",
			key: 4,
			children: "Закрыть профиль",
		},
	];

	return (
		<Router>
			<main className="rts__main static-main">
				<header className="static-main__header">
					<div className="container">
						<h1>Account</h1>
						<h2>Ваша учетная запись</h2>
					</div>
				</header>
				<section className="static-main__content account">
					<div className="container account__wrapper">
						<nav className="account__sidebar account-sidebar">
							<ul>
								<Links links={links} />
							</ul>
						</nav>
						<article className="account__right-block">
							<Route exact path="/account">
								<Profile user={user} />
							</Route>
							<Route exact path="/account/password">
								<ChangePassword
									resetPasswordMessage={resetPasswordMessage}
									password={password}
									setPassword={setPassword}
								/>
							</Route>
							<Route exact path="/account/delete">
								<DeleteProfile user={user} />
							</Route>
							<Route exact path="/account/avatar">
								<ChangePhoto
									canvasPropsObject={canvasPropsObject}
									updatePhoto={updatePhoto}
								/>
							</Route>
						</article>
					</div>
				</section>
			</main>
		</Router>
	);
}
