import React, { useEffect, useState, useRef } from "react"
import { ADD_NOTE_FORM, MISSING_FOCUS_ELEMENTS } from "../notes/NotesContainer"
import {
  StyledAddNote,
  InputWrapper,
  Input,
  Placeholder,
  UserPhoto,
  ButtonsWrapper,
  SaveButton,
  CancelButton,
} from "./AddNote.style"

const DEFAULT_INPUT_HEIGHT = 32
const INPUT_HEIGHT_AFTER_FOCUS = 49

export function AddNote({
  avatar,
  addNoteRequest,
  successReceiveNote,
  isFocused,
  setIsFocused,
}) {
  const [inputHeight, setInputHeight] = useState(DEFAULT_INPUT_HEIGHT)
  const [inputText, setInputText] = useState("")
  const addNoteInput = useRef()

  useEffect(() => {
    if (successReceiveNote) addNoteInputBluring()
  }, [successReceiveNote])

  useEffect(() => {
    if (!isFocused) {
      addNoteInput.current.textContent = ""
      setInputHeight(DEFAULT_INPUT_HEIGHT)
      setInputText("")
    }
  }, [isFocused])

  function handlePlaceholderClick() {
    handleInputClick()
    addNoteInput.current.focus()
  }

  function handleInputClick() {
    setIsFocused(ADD_NOTE_FORM)
    if (inputHeight === DEFAULT_INPUT_HEIGHT) {
      setInputHeight(INPUT_HEIGHT_AFTER_FOCUS)
    }
  }

  function handleInput(e) {
    setInputText(e.target.innerText.trim())
    setInputHeight(e.target.clientHeight)
  }

  function addNoteInputBluring() {
    setIsFocused(MISSING_FOCUS_ELEMENTS)
  }

  return (
    <StyledAddNote>
      <InputWrapper isFocused={isFocused} height={inputHeight}>
        <Placeholder isFocused={isFocused} onClick={handlePlaceholderClick}>
          Добавить заметку...
        </Placeholder>
        <UserPhoto src={avatar} alt="User photo" />
        <Input
          ref={addNoteInput}
          onInput={handleInput}
          onClick={handleInputClick}
          contentEditable={true}
          minHeight={inputHeight}
        ></Input>
      </InputWrapper>
      <ButtonsWrapper isFocused={isFocused}>
        <SaveButton
          disabled={!inputText && successReceiveNote}
          onClick={() => addNoteRequest(inputText)}
        >
          Сохранить
        </SaveButton>
        <CancelButton
          disabled={!successReceiveNote}
          onClick={addNoteInputBluring}
        >
          Отмена
        </CancelButton>
      </ButtonsWrapper>
    </StyledAddNote>
  )
}
