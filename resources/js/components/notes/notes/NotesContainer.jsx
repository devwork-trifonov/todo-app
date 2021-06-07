import React, { useState } from "react"
import { Note } from "../note/Note"
import { AddNote } from "../addNote/AddNote"
import { Notes, Header, NotesWrapper } from "./Notes.style"

export const ADD_NOTE_FORM = "ADD_NOTE_FORM"
export const MISSING_FOCUS_ELEMENTS = "MISSING_FOCUS_ELEMENTS"

function checkingFocusStatus(elemId, isFocusedId) {
  return elemId === isFocusedId
}

export function NotesContainer({
  userData,
  addNote,
  successReceiveNote,
  setNoteBody,
  deleteNote,
  notesWithRelativeDateField,
  todoId,
}) {
  const [isFocused, setIsFocused] = useState(MISSING_FOCUS_ELEMENTS)

  function addNoteRequest(body) {
    addNote({ body, todo_id: todoId })
  }

  return (
    <Notes>
      <Header>Заметки</Header>
      <AddNote
        isFocused={checkingFocusStatus(ADD_NOTE_FORM, isFocused)}
        setIsFocused={setIsFocused}
        avatar={userData.avatar}
        addNoteRequest={addNoteRequest}
        successReceiveNote={successReceiveNote}
      />
      <NotesWrapper>
        {notesWithRelativeDateField.map((note) => (
          <Note
            isFocused={checkingFocusStatus(note.id, isFocused)}
            setIsFocused={setIsFocused}
            note={note}
            avatar={userData.avatar}
            key={note.id}
            setNoteBody={setNoteBody}
            deleteNote={deleteNote}
          />
        ))}
      </NotesWrapper>
    </Notes>
  )
}
