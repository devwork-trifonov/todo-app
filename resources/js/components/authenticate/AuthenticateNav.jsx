import React from "react";
import { Link } from "react-router-dom";

export default function AuthenticateNav({ user, logout }) {
	const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

	function toggleClass() {
		const dropdown = document.getElementsByClassName("dropdown-menu")[0];
		const button = document.getElementById("account-dropdown__logo");
		dropdown.classList.toggle("dropdown-menu_opened");
		document.addEventListener("click", (e) => {
			if (
				dropdown.classList.contains("dropdown-menu_opened") &&
				e.target !== button
			) {
				dropdown.classList.remove("dropdown-menu_opened");
			}
		});
	}

	return (
		<nav className="nav rts__nav">
			<div className="container nav__wrapper">
				<Link to="/app" className="nav__logo logo"></Link>
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
						<Link to="/app">Запустить приложение</Link>
					</li>
				</ul>
				<div className="account-dropdown">
					<button
						className="account-dropdown__btn"
						onClick={(e) => {
							toggleClass();
						}}
					>
						<img
							id="account-dropdown__logo"
							src={user.avatar}
							alt="avatar"
						></img>
					</button>
					<div className="dropdown-menu">
						<div className="dropdown-menu__details">
							<img
								className="avatar"
								src={user.avatar}
								alt="avatar"
							></img>
							<div>
								<div className="name">
									{user.first_name} {user.last_name}
								</div>
								<div className="email">{user.email}</div>
							</div>
						</div>
						<div className="dropdown-menu__links-wrapper">
							<Link to="/account" className="dropdown-menu__link">
								Account
							</Link>
						</div>

						<button
							onClick={() => logout(csrfToken)}
							className="dropdown-menu__btn"
						>
							Выйти
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}
