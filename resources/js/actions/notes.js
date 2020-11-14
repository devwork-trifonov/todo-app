import axios from "axios"

export const RECEIVE_NOTES = "RECEIVE_NOTES"
export const ADD_NOTE = "ADD_NOTE"
export const RESET_SUCCESS_ADDED_NOTE = "RESET_SUCCESS_ADDED_NOTE"
export const RECEIVE_ADDED_NOTE = "RECEIVE_ADDED_NOTE"
export const REQUEST_NOTES = "REQUEST_NOTES"

export function deleteNote(noteData) {
  return (dispatch) => {
    dispatch(requestNotes())
    return axios
      .post("/notes/delete", { noteData, credentials: "same-origin" })
      .then((response) => response.data)
      .then((json) => {
        dispatch(receiveNotes(json))
      })
  }
}

export function setNoteBody(noteData) {
  return (dispatch) => {
    dispatch(requestNotes())
    return axios
      .post("/notes/setNoteBody", { noteData, credentials: "same-origin" })
      .then((response) => response.data)
      .then((json) => {
        dispatch(receiveNotes(json))
      })
  }
}

export function fetchNotes() {
  return (dispatch) => {
    return axios
      .post("/notes", {
        credentials: "same-origin",
      })
      .then((response) => response.data)
      .then((json) => {
        dispatch(receiveNotes(json))
      })
  }
}

export function addNote(note) {
  return (dispatch) => {
    dispatch(requestNotes())
    return axios
      .post("/notes/create", { note, credentials: "same-origin" })
      .then((response) => response.data)
      .then((json) => {
        dispatch(receiveAddedNote(json))
      })
  }
}

function receiveAddedNote(note) {
  return { type: RECEIVE_ADDED_NOTE, payload: { note } }
}

function receiveNotes(notes) {
  return {
    type: RECEIVE_NOTES,
    payload: {
      notes: notes,
    },
  }
}

function requestNotes() {
  return {
    type: REQUEST_NOTES,
  }
}
