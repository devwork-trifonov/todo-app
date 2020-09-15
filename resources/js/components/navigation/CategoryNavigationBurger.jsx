import React from "react";

export function NavBarBurger({ todoListName, toggleNavBarState, navBarState }) {
	return (
		<div
			className={
				!navBarState ? "nav-burger nav-burger_opened" : "nav-burger"
			}
			onClick={toggleNavBarState}
		>
			<div className="nav-burger__icon">
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div className="nav-burger__list-name">{todoListName}</div>
		</div>
	);
}
