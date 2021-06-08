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

export function Counters({
  todoListName,
  todoList,
  expiredTodos,
  completedTodos,
}) {
  return (
    <StyledCounters>
      <ListName>{todoListName}</ListName>
      <Wrapper>
        <CounterContainer>
          <AllTodos>{todoList.length}</AllTodos>
          <CounterCaption>задач(и)</CounterCaption>
        </CounterContainer>
        <CounterContainer>
          <ExpiredTodos>{expiredTodos.length}</ExpiredTodos>
          <CounterCaption>просрочено</CounterCaption>
        </CounterContainer>
        <CounterContainer>
          <CompletedTodos>{completedTodos.length}</CompletedTodos>
          <CompletedCaption>завершено</CompletedCaption>
        </CounterContainer>
      </Wrapper>
    </StyledCounters>
  )
}
