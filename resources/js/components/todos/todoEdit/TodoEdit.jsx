import React, { useEffect, useState, useRef, useReducer } from "react"
import moment from "moment"
import {
  StyledTodoEdit,
  ButtonsWrapper,
  CloseDetailsButton,
  CloseDetailsWithoutInactivateTodo,
  TodoDetails,
  InputWrapper,
  Input,
  DateFields,
  Date,
  DateHeading,
  DateValue,
} from "./TodoEdit.style"

const SET = "SET"
const UPDATE_BODY = "UPDATE_BODY"
const RESET = "RESET"

const todoInitialState = {
  todo: { id: -1, body: "" },
  oldTodo: { id: -1, body: "" },
}
function reducer(state, action) {
  switch (action.type) {
    case SET:
      return { todo: action.payload.todo, oldTodo: action.payload.todo }
    case UPDATE_BODY:
      return {
        ...state,
        todo: { ...state.todo, body: action.payload.todoBody },
      }
    case RESET:
      return { ...state, todo: state.oldTodo }
    default:
      return { ...state }
  }
}

export function TodoEdit({
  todo,
  resetTodoDetails,
  todoListName,
  hideDetails,
  setBody,
}) {
  const [isFocusedInput, setIsFocusedInput] = useState(false)
  const [todoState, dispatch] = useReducer(reducer, todoInitialState)

  const input = useRef()
  const closeTodoDetailsButton = useRef()
  const todoEdit = useRef()

  useEffect(() => {
    return document.removeEventListener("click", handleClickOutsideInput)
  }, [])

  useEffect(() => {
    if (!todo.body) return
    dispatch({ type: SET, payload: { todo: todo } })
  }, [todo])

  function handleInputChange(e) {
    if (!e.target.value) return
    dispatch({ type: UPDATE_BODY, payload: { todoBody: e.target.value } })
  }
  function handleInputKeydown(e) {
    if (e.key !== "Enter") return
    updateTodo()
  }
  function handleInputFocus() {
    if (!isFocusedInput) {
      document.addEventListener("click", handleClickOutsideInput)
    }
    setIsFocusedInput(true)
  }
  function handleInputBlur() {
    setIsFocusedInput(false)
  }
  function updateOnClickOnTodoEdit(e) {
    if (
      !input.current.contains(e.target) &&
      !closeTodoDetailsButton.current.contains(e.target)
    ) {
      updateTodo()
    }
  }
  function updateTodo() {
    if (todoState.oldTodo.body === todoState.todo.body) {
      return
    }
    setBody({ id: todoState.todo.id, body: todoState.todo.body })
  }
  const handleClickOutsideInput = (e) => {
    if (
      !todoEdit.current.contains(e.target) &&
      !input.current.contains(e.target) &&
      !closeTodoDetailsButton.current.contains(e.target)
    ) {
      resetTodo()
      document.removeEventListener("click", handleClickOutsideInput)
    } else if (input.current.contains(e.target)) {
      return
    } else {
      document.removeEventListener("click", handleClickOutsideInput)
    }
  }
  function closeTodoDetails() {
    resetTodo()
    resetTodoDetails()
    document.removeEventListener("click", handleClickOutsideInput)
  }
  function resetTodo() {
    dispatch({ type: RESET })
  }
  return (
    <StyledTodoEdit ref={todoEdit} onClick={updateOnClickOnTodoEdit}>
      <ButtonsWrapper>
        <CloseDetailsWithoutInactivateTodo onClick={hideDetails}>
          &#8592; {todoListName}
        </CloseDetailsWithoutInactivateTodo>
        <CloseDetailsButton
          ref={closeTodoDetailsButton}
          onClick={closeTodoDetails}
        >
          закрыть &nbsp;х
        </CloseDetailsButton>
      </ButtonsWrapper>
      <TodoDetails>
        <InputWrapper>
          <Input
            ref={input}
            type="text"
            value={todoState.todo.body}
            onChange={handleInputChange}
            onKeyDown={handleInputKeydown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </InputWrapper>
        <DateFields>
          {todo.begin_at ? (
            <Date>
              <DateHeading>начало</DateHeading>
              <DateValue>
                {moment(todo.begin_at).format("dd, DD MMM YY")}
              </DateValue>
            </Date>
          ) : null}
          {todo.will_end_at ? (
            <Date>
              <DateHeading>срок</DateHeading>
              <DateValue>
                {moment(todo.will_end_at).format("dd, DD MMM YY")}
              </DateValue>
            </Date>
          ) : (
            <Date>
              <DateHeading>срок</DateHeading>
              <DateValue>никогда</DateValue>
            </Date>
          )}
        </DateFields>
      </TodoDetails>
    </StyledTodoEdit>
  )
}
