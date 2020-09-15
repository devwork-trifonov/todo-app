import React, { useState, useEffect } from "react";

export default function ChangePassword({
	password,
	setPassword,
	resetPasswordMessage,
}) {
	const inputsInitialState = {
		current: "",
		new_password: "",
		new_password_confirmation: "",
	};
	const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

	let [inputs, setInputs] = useState(inputsInitialState);
	let [message, setMessage] = useState();
	let [messageClassName, setMessageClassName] = useState(
		"change-password__message"
	);

	useEffect(() => {
		setMessage(password.message);
		if (password.type === "error") {
			setMessageClassName(
				"change-password__message change-password__message_type_error"
			);
		} else if (password.type === "success") {
			setMessageClassName(
				"change-password__message change-password__message_type_success"
			);
		} else {
			setMessageClassName("change-password__message");
		}
	}, [password]);

	function handleInputChange(event) {
		const { name, value } = event.target;
		setInputs((prevState) => ({
			...prevState,
			[name]: value,
		}));
	}

	function sendForm(e) {
		e.preventDefault();
		let data = JSON.stringify(inputs);
		setPassword(data, csrfToken);
		setInputs(inputsInitialState);
	}

	return (
		<div className="change-password">
			<h1>Изменить пароль</h1>
			<span>
				Для изменения пароля введите свой текущий пароль и новый пароль
			</span>
			<div className={messageClassName}>{message}</div>
			<form
				className="change-password__form"
				onSubmit={(e) => sendForm(e)}
			>
				<label className="change-password__label" htmlFor="current">
					текущий пароль:
					<input
						className="change-password__input"
						required
						maxLength="16"
						minLength="8"
						name="current"
						type="password"
						autoComplete="off"
						autoCorrect="off"
						spellCheck="off"
						value={inputs.current}
						onChange={handleInputChange}
					/>
				</label>
				<label
					className="change-password__label"
					htmlFor="new_password"
				>
					Новый пароль:
					<input
						className="change-password__input"
						required
						maxLength="16"
						minLength="8"
						name="new_password"
						type="password"
						autoComplete="off"
						autoCorrect="off"
						spellCheck="off"
						value={inputs.new_password}
						onChange={handleInputChange}
					/>
				</label>
				<label
					className="change-password__label"
					htmlFor="new_password_confirmation"
				>
					Новый пароль (еще раз):
					<input
						className="change-password__input"
						required
						maxLength="16"
						minLength="8"
						name="new_password_confirmation"
						type="password"
						autoComplete="off"
						autoCorrect="off"
						spellCheck="off"
						value={inputs.new_password_confirmation}
						onChange={handleInputChange}
					/>
				</label>
				<input type="hidden" name="_token" value={csrfToken}></input>

				<button
					className="btn btn_purpose_account-actions change-password__btn"
					type="submit"
				>
					Сменить пароль
				</button>
			</form>
		</div>
	);
}
