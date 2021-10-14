import React from "react"
import {
  Toolbar,
  RestoreButton,
  DeleteButton,
} from "./ToolbarCompletedTodos.style"

export function ToolbarCompletedTodos({
  restoreTodoRequest,
  deleteTodoRequest,
  isSelectedTodo,
}) {
  return (
    <>
      {isSelectedTodo ? (
        <Toolbar>
          <RestoreButton
            title="Восстановить"
            onClick={restoreTodoRequest}
          ></RestoreButton>
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
