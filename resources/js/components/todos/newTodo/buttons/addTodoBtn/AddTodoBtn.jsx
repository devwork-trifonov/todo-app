import React from "react"
import { StyledAddTodoBtn } from "./AddTodoBtn.style"
import { postNewTodo } from "../../newTodoSlice"
import { useDispatch } from "react-redux"

export function AddTodoBtn({ isInputHasText, fetchStatus }) {
  const dispatch = useDispatch()
  const requestTodo = () => dispatch(postNewTodo())
  const isDisabled = !isInputHasText || fetchStatus === "pending"

  return (
    <StyledAddTodoBtn disabled={isDisabled} onClick={requestTodo}>
      Добавить задачу
    </StyledAddTodoBtn>
  )
}
