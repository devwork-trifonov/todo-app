import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export function NavBar({
	expiredTodos,
	weekTodos,
	tommorowTodos,
	todayTodos,
	todos,
	navBarState,
}) {
	return (
		<nav
			className={
				navBarState
					? "category-nav category-nav_opened"
					: "category-nav category-nav_closed"
			}
		>
			<img
				className="category-nav__logo"
				src="/images/logo.svg"
				alt="logo"
			/>
			<ul>
				<li>
					<NavLink
						to={`/app/all`}
						isActive={(match, location) => {
							const slicedLocation = location.pathname.slice(
								5,
								8
							);
							return slicedLocation === "all";
						}}
						className="category-nav__link"
						activeClassName="category-nav__link_active"
					>
						Все задачи
					</NavLink>
					<div
						className={
							todos.length || expiredTodos.length
								? "category-nav__counter"
								: "category-nav__counter_empty"
						}
					>
						{todos.length + expiredTodos.length}
					</div>
				</li>
				<li>
					<NavLink
						to={`/app/today`}
						isActive={(match, location) => {
							const slicedLocation = location.pathname.slice(
								5,
								10
							);
							return slicedLocation === "today";
						}}
						className="category-nav__link"
						activeClassName="category-nav__link_active"
					>
						Сегодня
					</NavLink>
					<div
						className={
							todayTodos.length || expiredTodos.length
								? "category-nav__counter"
								: "category-nav__counter_empty"
						}
					>
						{todayTodos.length + expiredTodos.length}
					</div>
				</li>
				<li>
					<NavLink
						to={`/app/tommorow`}
						isActive={(match, location) => {
							const slicedLocation = location.pathname.slice(
								5,
								13
							);
							return slicedLocation === "tommorow";
						}}
						className="category-nav__link"
						activeClassName="category-nav__link_active"
					>
						Завтра
					</NavLink>
					<div
						className={
							tommorowTodos.length
								? "category-nav__counter"
								: "category-nav__counter_empty"
						}
					>
						{tommorowTodos.length}
					</div>
				</li>
				<li>
					<NavLink
						to={`/app/week`}
						isActive={(match, location) => {
							const slicedLocation = location.pathname.slice(
								5,
								9
							);
							return slicedLocation === "week";
						}}
						className="category-nav__link"
						activeClassName="category-nav__link_active"
					>
						Неделя
					</NavLink>
					<div
						className={
							weekTodos.length || expiredTodos.length
								? "category-nav__counter"
								: "category-nav__counter_empty"
						}
					>
						{weekTodos.length + expiredTodos.length}
					</div>
				</li>
			</ul>
		</nav>
	);
}
