import React from "react"
import {
  StyledCounters,
  ListName,
  Wrapper,
  CounterContainer,
  AllTodos,
  ExpiredTodos,
  CompletedTodos,
  CounterCaption,
  CompletedCaption,
} from "./Counters.style"

export function Counters({ todoListName, todoList }) {
  const all = todoList.filter((todo) => !todo.completed)
  const expired = todoList.filter((todo) => todo.expired)
  const completed = todoList.filter((todo) => todo.completed)
  return (
    <StyledCounters>
      <ListName>{todoListName}</ListName>
      <Wrapper>
        <CounterContainer>
          <AllTodos>{all.length}</AllTodos>
          <CounterCaption>задач(и)</CounterCaption>
        </CounterContainer>
        <CounterContainer>
          <ExpiredTodos>{expired.length}</ExpiredTodos>
          <CounterCaption>просрочено</CounterCaption>
        </CounterContainer>
        <CounterContainer>
          <CompletedTodos>{completed.length}</CompletedTodos>
          <CompletedCaption>завершено</CompletedCaption>
        </CounterContainer>
      </Wrapper>
    </StyledCounters>
  )
}
