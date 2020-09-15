import React from "react";
import { Link } from "react-router-dom";

export default function UnAuthenticateNav() {
	return (
		<nav className="nav rts__nav">
			<div className="container nav__wrapper">
				<Link
					to="/"
					className="nav__logo logo"
					onClick={() => {
						if (document.location.pathname === "/") {
							location.reload();
						}
					}}
				></Link>
				<ul className="nav__ul">
					<li>
						<Link to="/tour">Знакомство</Link>
					</li>
					<li>
						<Link to="/new">Что нового?</Link>
					</li>
					<li>
						<Link to="/upgrade">Обновить</Link>
					</li>
					<li>
						<Link to="/help">Помощь</Link>
					</li>
					<li>
						<Link to="/login">Вход</Link>
					</li>
					<li>
						<Link to="/register" className="nav__signup-btn">
							Подписаться бесплатно
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}
