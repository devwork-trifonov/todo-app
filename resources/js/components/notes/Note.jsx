import React, { useEffect, useState, useRef } from "react"
// import moment from "moment";
// window.moment = require("moment");
const moment = window.moment

export function Note({ note, avatar, setNoteBody, deleteNote }) {
  const [noteInputHeight, setNoteInputHeight] = useState(15)
  const [isFocusedNote, setIsFocusedNote] = useState(false)
  const [noteInputText, setNoteInputText] = useState("")
  const noteInput = useRef()

  const calendar = {
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

  useEffect(() => {
    noteInput.current.innerText = note.body
    setNoteInputText(note.body)
    setNoteInputHeight(noteInput.current.clientHeight)
  }, [])

  useEffect(() => {
    if (isFocusedNote) {
      setNoteInputHeight(noteInput.current.clientHeight + 15)
    } else {
      setNoteInputHeight(noteInput.current.clientHeight)
    }
  }, [isFocusedNote])

  function noteInputHandler(e) {
    setNoteInputText(e.target.innerText.trim())
    setNoteInputHeight(e.target.clientHeight)
  }

  function noteInputClickHandler() {
    setIsFocusedNote(true)
  }

  function noteInputBluring() {
    noteInput.current.textContent = note.body
    setIsFocusedNote(false)
    setNoteInputText(note.body)
  }

  function changeNoteRequest() {
    setNoteBody({ id: note.id, body: noteInputText })
    setIsFocusedNote(false)
  }

  function deleteNoteRequest() {
    deleteNote({ id: note.id })
  }

  return (
    <div className="note">
      <div
        style={{
          height: noteInputHeight,
        }}
        className={
          !isFocusedNote
            ? "note__text-input-wrapper"
            : "note__text-input-wrapper note__text-input-wrapper_focused"
        }
      >
        <div className="note__avatar-wrapper">
          <img src={avatar} alt="user" className="avatar" />
        </div>
        <div
          ref={noteInput}
          className="text-input"
          onInput={noteInputHandler}
          contentEditable={isFocusedNote}
        ></div>
      </div>
      {isFocusedNote ? (
        <div className="note__buttons-wrapper">
          <button
            disabled={note.body === noteInputText}
            className="btn"
            onClick={changeNoteRequest}
          >
            Сохранить
          </button>
          <button className="btn btn_style_blond" onClick={noteInputBluring}>
            Отмена
          </button>
        </div>
      ) : (
        <div className="controls">
          <div>
            {note.created_at === note.updated_at
              ? moment(note.created_at).calendar(moment(), calendar)
              : `Изменено ${moment(note.updated_at).calendar(
                  moment(),
                  updatedCalendar
                )}`}
          </div>
          <button className="controls__button" onClick={noteInputClickHandler}>
            Изменить
          </button>
          <button className="controls__button" onClick={deleteNoteRequest}>
            Удалить
          </button>
        </div>
      )}{" "}
    </div>
  )
}
