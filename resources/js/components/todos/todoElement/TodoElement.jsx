import React, { useEffect } from "react"
import { useRouteMatch } from "react-router-dom"
import moment from "moment"

import { Todo, TodoBody, Wrapper, Checkbox, EndDate } from "./TodoElement.style"

export function TodoElement({
  resetTodoDetails,
  todo,
  handleClickTodoElement,
  completed = false,
  expired = false,
  selected = false,
}) {
  const { url } = useRouteMatch()

  useEffect(() => {
    resetTodoDetails()
  }, [resetTodoDetails, url])
  return (
    <Todo selected={selected} onClick={() => handleClickTodoElement(todo.id)}>
      <Wrapper>
        <Checkbox selected={selected} />
        <TodoBody completed={completed} expired={expired}>
          {todo.body}
        </TodoBody>
      </Wrapper>
      {completed ? (
        <EndDate completed={completed}>
          {moment(todo.completed_at).format("DD MMM")}
        </EndDate>
      ) : todo.will_end_at ? (
        <EndDate completed={completed} expired={expired}>
          {moment(todo.will_end_at).format("DD MMM")}
        </EndDate>
      ) : null}
    </Todo>
  )
}
