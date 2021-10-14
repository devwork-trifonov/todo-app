import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { TodoElement } from "../todoElement/TodoElement"

export function TodoList({
  handleClickTodoElement,
  resetTodoDetails,
  todoList,
  isSelectedTodo,
  selectedTodoId,
}) {
  return (
    <>
      <StyledTodoList>
        {todoList.map((todo) => (
          <TodoElement
            key={todo.id}
            todo={todo}
            handleClickTodoElement={handleClickTodoElement}
            resetTodoDetails={resetTodoDetails}
            completed={todo.completed}
            selected={todo.id === selectedTodoId && isSelectedTodo}
            expired={todo.expired}
          />
        ))}
      </StyledTodoList>
    </>
  )
}
const StyledTodoList = styled.div`
  overflow-y: scroll;
  flex: 0 1 86%;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.4);
    border-radius: 3px;
    height: 30%;
  }
`
