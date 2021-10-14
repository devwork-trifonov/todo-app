import React from "react"
import {
  Toolbar,
  CompleteButton,
  DeleteButton,
} from "./ToolbarUnfinishedTodos.style"

export function ToolbarUnfinishedTodos({
  completeTodoRequest,
  deleteTodoRequest,
  isSelectedTodo,
}) {
  return (
    <>
      {isSelectedTodo ? (
        <Toolbar>
          <CompleteButton
            title="Завершить задачу"
            onClick={completeTodoRequest}
          ></CompleteButton>
          <DeleteButton
            title="Удалить задачу"
            onClick={deleteTodoRequest}
          ></DeleteButton>
        </Toolbar>
      ) : (
        <Toolbar />
      )}
    </>
  )
}
