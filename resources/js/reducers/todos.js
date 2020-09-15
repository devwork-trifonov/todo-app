import {
	REQUEST_TODOS,
	RECEIVE_TODOS,
	ERROR_TODOS,
	RECEIVE_ADD_TODO,
	REQUEST_ADD_TODO,
} from "../actions/todos";

export function todos(
	state = { isFetchingTodos: true, successAddedTodo: true, todosData: [] },
	action
) {
	switch (action.type) {
		case REQUEST_TODOS:
			return Object.assign({}, state, {
				...state,
				isFetchingTodos: true,
			});
		case RECEIVE_TODOS:
			return Object.assign({}, state, {
				...state,
				successAddedTodo: true,
				isFetchingTodos: false,
				todosData: action.payload.data,
			});
		case ERROR_TODOS:
			return Object.assign({}, state, {
				isFetchingTodos: false,
			});
		case REQUEST_ADD_TODO:
			return Object.assign({}, state, {
				...state,
				successAddedTodo: false,
			});
		case RECEIVE_ADD_TODO:
			return Object.assign({}, state, {
				...state,
				successAddedTodo: true,
				todosData: [...state.todosData, action.payload.todoData],
			});
		default:
			return state;
	}
}
