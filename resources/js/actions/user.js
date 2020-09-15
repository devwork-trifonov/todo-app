import { fetchNotes } from "./notes";
import { fetchTodos } from "./todos";

export const LOGOUT_USER = "LOGOUT_USER";
export const REQUEST_USER = "REQUEST_USER";
export const RECEIVE_USER = "RECEIVE_USER";
export const ERROR_USER = "ERROR_USER";
export const SET_PASSWORD = "SET_PASSWORD";
export const RESET_PASSWORD_MESSAGE = "RESET_PASSWORD_MESSAGE";

function requestUser() {
	return {
		type: REQUEST_USER,
	};
}

function receiveUser(json) {
	return {
		type: RECEIVE_USER,
		payload: {
			data: json,
		},
	};
}

function errorUser(error) {
	return {
		type: ERROR_USER,
		payload: {
			error: error,
		},
	};
}

function responseSetPassword(data) {
	const type = Object.keys(data)[0];
	const message = data[Object.keys(data)[0]];
	return {
		type: SET_PASSWORD,
		payload: {
			type,
			message,
		},
	};
}

export function resetPasswordMessage() {
	return {
		type: RESET_PASSWORD_MESSAGE,
	};
}

export function setPassword(data, token) {
	return (dispatch) => {
		return fetch("/account/update-password", {
			credentials: "same-origin",
			method: "PUT",
			headers: {
				"X-CSRF-TOKEN": token,
				"Content-Type": "application/json",
			},
			body: data,
		})
			.then((response) => response.json())
			.then(
				(res) => dispatch(responseSetPassword(res)),
				(err) => console.log("object", err)
			);
	};
}

export function logIn(data, token) {
	return (dispatch) => {
		return fetch("/login", {
			method: "POST",
			headers: {
				"X-CSRF-TOKEN": token,
			},
			body: data,
		})
			.then((res) => res.text())
			.then((res) => {
				const result = document.createElement("div");
				result.innerHTML = res;
				const newToken = result.querySelector('meta[name="csrf-token"]')
					.content;
				dispatch(fetchUser(newToken));
				dispatch(fetchNotes(newToken));
				dispatch(fetchTodos(newToken));
			});
	};
}

export function register(data) {
	return (dispatch) => {
		return fetch("/register", {
			method: "POST",
			body: data,
		})
			.then((res) => res.text())
			.then((res) => {
				const result = document.createElement("div");
				result.innerHTML = res;
				const newToken = result.querySelector('meta[name="csrf-token"]')
					.content;
				dispatch(fetchUser(newToken));
				dispatch(fetchNotes(newToken));
				dispatch(fetchTodos(newToken));
			});
	};
}

export function updatePhoto(blob, token) {
	return (dispatch) => {
		let data = new FormData();
		data.append("photo", blob);
		data.append("_method", "PUT");
		return fetch("/account/update-photo", {
			credentials: "same-origin",
			method: "POST",
			headers: {
				"X-CSRF-TOKEN": token,
			},
			body: data,
		}).then(() => dispatch(fetchUser(token)));
	};
}

export function logoutUser(token) {
	return (dispatch) => {
		return fetch("/logout", {
			credentials: "same-origin",
			method: "POST",
			headers: { "X-CSRF-TOKEN": token },
		}).then(dispatch({ type: LOGOUT_USER }));
	};
}

export default function fetchUser(token) {
	return (dispatch) => {
		dispatch(requestUser());
		return fetch("/user", {
			credentials: "same-origin",
			method: "POST",
			headers: { "X-CSRF-TOKEN": token },
		})
			.then((response) => response.json())
			.then(
				(json) => dispatch(receiveUser(json)),
				(error) => dispatch(errorUser(error))
			);
	};
}
