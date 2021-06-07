import React from "react"
import { connect } from "react-redux"
import moment from "moment"
import { NotesContainer } from "./NotesContainer"

import { addNote, setNoteBody, deleteNote } from "../../../actions/notes"

const createdCalendar = {
  sameDay: "[Сегодня в] HH:mm",
  lastDay: "[Вчера в] HH:mm",
  lastWeek: "DD MMM [в] HH:mm",
  sameElse: "DD MMM [в] HH:mm",
}
const updatedCalendar = {
  sameDay: "[сегодня в] HH:mm",
  lastDay: "[вчера в] HH:mm",
  lastWeek: "DD MMM [в] HH:mm",
  sameElse: "DD MMM [в] HH:mm",
}

function Notes(props) {
  const filteredNotes = props.notes.filter(
    (note) => note.todo_id === props.todoId
  )
  const notesWithRelativeDateField = addRelativeDateFieldToNotes(filteredNotes)
  return (
    <NotesContainer
      {...props}
      notesWithRelativeDateField={notesWithRelativeDateField}
    />
  )
}

function addRelativeDateFieldToNotes(notes) {
  const outputNotes = []
  for (const note of notes) {
    outputNotes.push(addRelativeDateFieldToNote(note))
  }
  return outputNotes
}

function addRelativeDateFieldToNote(note) {
  const outputNote = { ...note }
  outputNote.relativeDate =
    outputNote.created_at === outputNote.updated_at
      ? moment(outputNote.created_at).calendar(moment(), createdCalendar)
      : `Изменено ${moment(outputNote.updated_at).calendar(
          moment(),
          updatedCalendar
        )}`
  return outputNote
}

function mapStateToProps(state) {
  const { userData } = state.user
  const { successReceiveNote, notes } = state.notes
  return {
    userData,
    successReceiveNote,
    notes,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNote: (note) => dispatch(addNote(note)),
    setNoteBody: (noteData) => dispatch(setNoteBody(noteData)),
    deleteNote: (noteData) => dispatch(deleteNote(noteData)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes)
