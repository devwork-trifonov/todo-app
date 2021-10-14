import axios from "axios"

export const NOTES_RECEIVED_AFTER_CHANGES = "NOTES_RECEIVED_AFTER_CHANGES"

export function deleteNote(noteData) {
  return (dispatch) => {
    return axios
      .post("/notes/delete", { noteData, credentials: "same-origin" })
      .then((response) => response.data)
      .then((notes) => {
        dispatch(receiveNotesAfterChanges(notes))
      })
  }
}

export function setNoteBody(noteData) {
  return (dispatch) => {
    return axios
      .post("/notes/setNoteBody", { noteData, credentials: "same-origin" })
      .then((response) => response.data)
      .then((notes) => {
        dispatch(receiveNotesAfterChanges(notes))
      })
  }
}

export function addNote(note) {
  return (dispatch) => {
    return axios
      .post("/notes/create", { note, credentials: "same-origin" })
      .then((response) => response.data)
      .then((notes) => {
        dispatch(receiveNotesAfterChanges(notes))
      })
  }
}

function receiveNotesAfterChanges(notes) {
  return { type: NOTES_RECEIVED_AFTER_CHANGES, payload: { notes } }
}
