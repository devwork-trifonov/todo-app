export const REQUEST_ADD_TODO = "REQUEST_ADD_TODO";
export const RECEIVE_ADD_TODO = "RECEIVE_ADD_TODO";
export const REQUEST_TODOS = "REQUEST_TODOS";
export const RECEIVE_TODOS = "RECEIVE_TODOS";
export const ERROR_TODOS = "ERROR_TODOS";
export const SUCCESS_ADDED_TODO = "SUCCESS_ADDED_TODO";
export const RESET_SUCCESS_ADDED_TODO = "RESET_SUCCESS_ADDED_TODO";

export function deleteTodo(todoData, token) {
	return (dispatch) => {
		dispatch(requestAddTodo());
		return fetch("/todos/delete", {
			credentials: "same-origin",
			method: "POST",
			headers: {
				"X-CSRF-TOKEN": token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(todoData),
		})
			.then((response) => response.json())
			.then((json) => dispatch(receiveTodos(json)));
	};
}

export function restoreTodo(todoData, token) {
	return (dispatch) => {
		dispatch(requestAddTodo());
		return fetch("/todos/restore", {
			credentials: "same-origin",
			method: "POST",
			headers: {
				"X-CSRF-TOKEN": token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(todoData),
		})
			.then((response) => response.json())
			.then((json) => dispatch(receiveTodos(json)));
	};
}

export function completeTodo(todoData, token) {
	return (dispatch) => {
		dispatch(requestAddTodo());
		return fetch("/todos/complete", {
			credentials: "same-origin",
			method: "POST",
			headers: {
				"X-CSRF-TOKEN": token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(todoData),
		})
			.then((response) => response.json())
			.then((json) => dispatch(receiveTodos(json)));
	};
}

export function setBody(todoData, token) {
	return (dispatch) => {
		dispatch(requestAddTodo());
		return fetch("/todos/setBody", {
			credentials: "same-origin",
			method: "POST",
			headers: {
				"X-CSRF-TOKEN": token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(todoData),
		})
			.then((response) => response.json())
			.then((json) => dispatch(receiveTodos(json)));
	};
}

export function addTodo(todoData, token) {
	return (dispatch) => {
		dispatch(requestAddTodo());
		return fetch("/todos/create", {
			credentials: "same-origin",
			method: "POST",
			headers: {
				"X-CSRF-TOKEN": token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(todoData),
		})
			.then((response) => response.json())
			.then((json) => {
				dispatch(receiveAddTodo(json));
			});
	};
}

export function fetchTodos(token) {
	return (dispatch) => {
		dispatch(requestTodos());
		return fetch("/todos", {
			credentials: "same-origin",
			method: "POST",
			headers: {
				// "Content-type": "application/json",
				"X-CSRF-TOKEN": token,
			},
		})
			.then((response) => response.json())
			.then(
				(json) => {
					dispatch(receiveTodos(json));
				},
				(error) => dispatch(errorTodos(error))
			);
	};
}

function requestAddTodo() {
	return {
		type: REQUEST_ADD_TODO,
	};
}

function receiveAddTodo(todoData) {
	return {
		type: RECEIVE_ADD_TODO,
		payload: {
			todoData: todoData,
		},
	};
}

function requestTodos() {
	return {
		type: REQUEST_TODOS,
	};
}

function receiveTodos(json) {
	return {
		type: RECEIVE_TODOS,
		payload: {
			data: json,
		},
	};
}

function errorTodos(error) {
	return {
		type: ERROR_TODOS,
		payload: {
			data: error,
		},
	};
}

function successAddTodo() {
	return {
		type: SUCCESS_ADDED_TODO,
		payload: {},
	};
}

function resetSuccessAddTodo() {
	return {
		type: RESET_SUCCESS_ADDED_TODO,
		payload: {},
	};
}
