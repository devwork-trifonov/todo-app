import React, { useState } from "react"
import { Note } from "./note/Note"
import { AddNote } from "./addNote/AddNote"
import { Notes as StyledNotes, Header, NotesWrapper } from "./Notes.style"
import { useDispatch, useSelector } from "react-redux"
import { addNote, setNoteBody, deleteNote } from "../../actions/notes"
import moment from "moment"

export const ADD_NOTE_FORM = "ADD_NOTE_FORM"
export const MISSING_FOCUS_ELEMENTS = "MISSING_FOCUS_ELEMENTS"

export function Notes() {
  const removeFocus = () => setIsFocused(MISSING_FOCUS_ELEMENTS)
  const [isFocused, setIsFocused] = useState(MISSING_FOCUS_ELEMENTS)
  const { userData } = useSelector((state) => state.user)
  const { notes } = useSelector((state) => state.todos.selectedTodo.data)
  const todoId = useSelector((state) => state.todos.selectedTodo.data.id)

  const dispatch = useDispatch()
  const addNoteRequest = (body) => {
    removeFocus()
    dispatch(addNote({ body, todo_id: todoId }))
  }
  const setBodyRequest = (noteData) => {
    removeFocus()
    dispatch(setNoteBody(noteData))
  }
  const deleteNoteRequest = (noteData) => {
    removeFocus()
    dispatch(deleteNote(noteData))
  }

  const notesWithRelativeDateField = addRelativeDateFieldToNotes(notes)

  return (
    <StyledNotes>
      <Header>Заметки</Header>
      <AddNote
        isFocused={checkingFocusStatus(ADD_NOTE_FORM, isFocused)}
        setIsFocused={setIsFocused}
        avatar={userData.avatar}
        addNoteRequest={addNoteRequest}
      />
      <NotesWrapper>
        {notesWithRelativeDateField.map((note) => (
          <Note
            isFocused={checkingFocusStatus(note.id, isFocused)}
            setIsFocused={setIsFocused}
            note={note}
            avatar={userData.avatar}
            key={note.id}
            setNoteBody={setBodyRequest}
            deleteNote={deleteNoteRequest}
          />
        ))}
      </NotesWrapper>
    </StyledNotes>
  )
}

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

function checkingFocusStatus(elemId, isFocusedId) {
  return elemId === isFocusedId
}
function addRelativeDateFieldToNotes(notes) {
  if (!notes) return []
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
