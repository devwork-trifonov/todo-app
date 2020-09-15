import {
	REQUEST_USER,
	RECEIVE_USER,
	ERROR_USER,
	LOGOUT_USER,
	SET_PASSWORD,
	RESET_PASSWORD_MESSAGE,
} from "../actions/user";

const initialState = {
	isFetchingUser: true,
	isAuthenticate: false,
	userData: {},
	password: { type: "", message: "" },
};

export function user(state = initialState, action) {
	switch (action.type) {
		case REQUEST_USER:
			return Object.assign({}, state, {
				isFetchingUser: true,
			});
		case RECEIVE_USER:
			return Object.assign({}, state, {
				isFetchingUser: false,
				isAuthenticate: true,
				userData: action.payload.data,
			});
		case ERROR_USER:
			return Object.assign({}, state, {
				isFetchingUser: false,
				isAuthenticate: false,
				error: action.payload.error,
			});
		case LOGOUT_USER:
			return Object.assign({}, state, {
				isFetchingUser: false,
				isAuthenticate: false,
				userData: initialState.userData,
			});
		case SET_PASSWORD:
			return Object.assign({}, state, {
				password: {
					type: action.payload.type,
					message: action.payload.message,
				},
			});
		case RESET_PASSWORD_MESSAGE:
			return Object.assign({}, state, {
				password: initialState.password,
			});
		default:
			return state;
	}
}
