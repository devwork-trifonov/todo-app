export const RECEIVE_NOTES = "RECEIVE_NOTES";
export const ADD_NOTE = "ADD_NOTE";
export const RESET_SUCCESS_ADDED_NOTE = "RESET_SUCCESS_ADDED_NOTE";
export const RECEIVE_ADDED_NOTE = "RECEIVE_ADDED_NOTE";
export const REQUEST_NOTES = "REQUEST_NOTES";

export function deleteNote(noteData, token) {
	return (dispatch) => {
		dispatch(requestNotes());
		return fetch("/notes/delete", {
			credentials: "same-origin",
			method: "POST",
			headers: {
				"X-CSRF-TOKEN": token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(noteData),
		})
			.then((response) => response.json())
			.then((json) => {
				dispatch(receiveNotes(json));
			});
	};
}

export function setNoteBody(noteData, token) {
	return (dispatch) => {
		dispatch(requestNotes());
		return fetch("/notes/setNoteBody", {
			credentials: "same-origin",
			method: "POST",
			headers: {
				"X-CSRF-TOKEN": token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(noteData),
		})
			.then((response) => response.json())
			.then((json) => {
				dispatch(receiveNotes(json));
			});
	};
}

export function fetchNotes(token) {
	return (dispatch) => {
		return fetch("/notes", {
			credentials: "same-origin",
			method: "POST",
			headers: {
				// "Content-type": "application/json",
				"X-CSRF-TOKEN": token,
			},
		})
			.then((response) => response.json())
			.then((json) => {
				dispatch(receiveNotes(json));
			});
	};
}

export function addNote(note, token) {
	return (dispatch) => {
		// dispatch(resetSuccessAddedNote());
		dispatch(requestNotes());
		return fetch("/notes/create", {
			credentials: "same-origin",
			method: "POST",
			headers: {
				"X-CSRF-TOKEN": token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(note),
		})
			.then((response) => response.json())
			.then((json) => {
				dispatch(receiveAddedNote(json));
			});
	};
}

function receiveAddedNote(note) {
	return { type: RECEIVE_ADDED_NOTE, payload: { note } };
}

function resetSuccessAddedNote() {
	return { type: RESET_SUCCESS_ADDED_NOTE, payload: {} };
}

function receiveNotes(notes) {
	return {
		type: RECEIVE_NOTES,
		payload: {
			notes: notes,
		},
	};
}

function requestNotes() {
	return {
		type: REQUEST_NOTES,
	};
}
