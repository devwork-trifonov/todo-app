import React from "react";

export default function Profile({ user }) {
	const registrationDate = new Date(user.created_at);
	const registrationDateDDMMYY = ` ${registrationDate.getDate()} ${
		registrationDate.getMonth() + 1
	} ${registrationDate.getFullYear()}`;
	return (
		<div className="profile">
			<img
				className="profile__avatar"
				src={user.avatar}
				alt="avatar"
			></img>
			<div className="profile__wrapper">
				<div className="profile__name">
					{user.first_name + " "} {user.last_name}
				</div>
				<div className="profile__joined">
					<span>Зарегистрирован:</span>
					{registrationDateDDMMYY}
				</div>
			</div>
		</div>
	);
}
