import React, { useEffect, useState } from "react"
import { TodoEdit } from "../todoEdit/TodoEdit"
import Notes from "../../notes/notes/Notes"
import { TodoDetails } from "./TodoDetails.style"

export function TodoDetailsContainer({
  isOpened,
  todoId,
  todoListName,
  hideDetails,
  unselectingTodo,
  setBody,
  todosData,
}) {
  const [chosenTodo, setChosenTodo] = useState({ id: -1, body: "" })
  useEffect(() => {
    setChosenTodo({ ...todosData.find((todo) => todo.id === todoId) })
  }, [todoId, todosData])

  return (
    <TodoDetails isOpened={isOpened}>
      <TodoEdit
        todo={chosenTodo}
        setBody={setBody}
        unselectingTodo={unselectingTodo}
        todoListName={todoListName}
        hideDetails={hideDetails}
      />
      <Notes todoId={todoId} />
    </TodoDetails>
  )
}
