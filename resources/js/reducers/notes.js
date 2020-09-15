import {
	RECEIVE_NOTES,
	RECEIVE_ADDED_NOTE,
	REQUEST_NOTES,
} from "../actions/notes";

export function notes(state = { successReceiveNote: true, notes: [] }, action) {
	switch (action.type) {
		case RECEIVE_NOTES:
			return Object.assign({}, state, {
				successReceiveNote: true,
				notes: action.payload.notes,
			});
		case RECEIVE_ADDED_NOTE:
			return Object.assign({}, state, {
				successReceiveNote: true,
				notes: [...state.notes, action.payload.note],
			});
		case REQUEST_NOTES:
			return Object.assign({}, state, {
				successReceiveNote: false,
			});

		default:
			return state;
	}
}
