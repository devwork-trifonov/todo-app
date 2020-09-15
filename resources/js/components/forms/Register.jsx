import React, { useState } from "react";

const CSRF_TOKEN = document.querySelector('meta[name="csrf-token"]').content;

export function Register({ elementClassName, action }) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function submit(e) {
		e.preventDefault();
		const body = new FormData(e.currentTarget);
		action(body);
		setEmail("");
		setPassword("");
		setFirstName("");
		setLastName("");
		setName("");
	}

	return (
		<>
			<form className={`register ${elementClassName}`} onSubmit={submit}>
				<h3>Подключайтесь свободно</h3>
				<input type="hidden" name="_token" value={CSRF_TOKEN}></input>
				<input
					type="text"
					name="first-name"
					required
					className="input"
					placeholder="Имя"
					autoComplete="off"
					value={firstName}
					onChange={(e) => setFirstName(e.currentTarget.value)}
				/>
				<input
					type="text"
					name="last-name"
					required
					className="input"
					placeholder="Фамилия"
					autoComplete="off"
					value={lastName}
					onChange={(e) => setLastName(e.currentTarget.value)}
				/>
				<input
					required
					type="email"
					name="email"
					className="input"
					placeholder="Электронная почта"
					value={email}
					onChange={(e) => setEmail(e.currentTarget.value)}
				/>
				<input
					type="text"
					name="name"
					required
					className="input"
					placeholder="Имя пользователя"
					autoComplete="off"
					value={name}
					onChange={(e) => setName(e.currentTarget.value)}
				/>
				<input
					required
					type="password"
					name="password"
					className="input"
					placeholder="Пароль"
					value={password}
					onChange={(e) => setPassword(e.currentTarget.value)}
					autoComplete="on"
				/>
				<button
					type="submit"
					className="btn btn_purpose_account-actions register__btn"
				>
					Вход
				</button>
			</form>
		</>
	);
}
