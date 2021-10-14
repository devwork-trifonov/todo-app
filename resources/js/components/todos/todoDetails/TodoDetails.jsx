import React from "react"
import { TodoEdit } from "../todoEdit/TodoEdit"
import { Notes } from "../../notes/Notes"
import { StyledTodoDetails } from "./TodoDetails.style"
import { setBody } from "../../../actions/todos"
import { useDispatch, useSelector } from "react-redux"

export function TodoDetails({
  isOpened,
  todoListName,
  hideDetails,
  resetTodoDetails,
}) {
  const dispatch = useDispatch()
  const chosenTodo = useSelector((state) => state.todos.selectedTodo.data)

  return (
    <StyledTodoDetails isOpened={isOpened}>
      <TodoEdit
        todo={chosenTodo}
        setBody={(props) => dispatch(setBody(props))}
        resetTodoDetails={resetTodoDetails}
        todoListName={todoListName}
        hideDetails={hideDetails}
      />
      <Notes />
    </StyledTodoDetails>
  )
}
