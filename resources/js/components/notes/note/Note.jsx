import React, { useEffect, useState, useRef } from "react"
import { MISSING_FOCUS_ELEMENTS } from "../notes/NotesContainer"
import {
  StyledNote,
  UserPhoto,
  Input,
  InputWrapper,
  CreateButtons,
  SaveButton,
  CancelButton,
  EditButtons,
  EditButton,
} from "./Note.style"

export function Note({
  note,
  avatar,
  setNoteBody,
  deleteNote,
  isFocused,
  setIsFocused,
}) {
  const [inputHeight, setInputHeight] = useState(15)
  const [inputText, setInputText] = useState("")
  const noteInput = useRef()

  useEffect(() => {
    noteInput.current.innerText = note.body
    setInputText(note.body)
    setInputHeight(noteInput.current.clientHeight)
  }, [note.body, isFocused])

  function handleInput(e) {
    setInputText(e.target.innerText.trim())
    setInputHeight(e.target.clientHeight)
  }

  function handleFocus() {
    setIsFocused(note.id)
  }

  function inputBluring() {
    noteInput.current.textContent = note.body
    setIsFocused(MISSING_FOCUS_ELEMENTS)
    setInputText(note.body)
    setInputHeight(noteInput.current.clientHeight)
  }

  function changeNoteRequest() {
    setNoteBody({ id: note.id, body: inputText })
    setIsFocused(MISSING_FOCUS_ELEMENTS)
  }

  function deleteNoteRequest() {
    deleteNote({ id: note.id })
  }

  return (
    <StyledNote>
      <InputWrapper inputHeight={inputHeight} isFocused={isFocused}>
        <UserPhoto src={avatar} alt="User photo" />
        <Input
          ref={noteInput}
          onInput={handleInput}
          contentEditable={isFocused}
        ></Input>
      </InputWrapper>
      {isFocused ? (
        <CreateButtons>
          <SaveButton
            disabled={note.body === inputText}
            onClick={changeNoteRequest}
          >
            Сохранить
          </SaveButton>
          <CancelButton onClick={inputBluring}>Отмена</CancelButton>
        </CreateButtons>
      ) : (
        <EditButtons>
          <div>{note.relativeDate}</div>
          <EditButton onClick={handleFocus}>Изменить</EditButton>
          <EditButton onClick={deleteNoteRequest}>Удалить</EditButton>
        </EditButtons>
      )}
    </StyledNote>
  )
}
