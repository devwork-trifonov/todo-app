import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { TodoDetails } from "../todoDetails/TodoDetails"
import { NewTodo } from "../newTodo/NewTodo"
import { Counters } from "../counters/Counters"
import { ToolbarCompletedTodos } from "../toolbarCompletedTodos/ToolbarCompletedTodos"
import { ToolbarUnfinishedTodos } from "../toolbarUnfinishedTodos/ToolbarUnfinishedTodos"
import { TodoList } from "../todoList/TodoList"
import { NavLink, Route } from "react-router-dom"
import {
  restoreTodo,
  addTodo,
  completeTodo,
  deleteTodo,
  replaceTodo,
  selectTodo,
  deselectTodo,
  resetTodo,
  todoListChandged,
} from "../../../actions/todos"

export function TodosContainer({ isOpenedCategoryNavigation }) {
  const dispatch = useDispatch()
  const { list } = useParams()
  const [isDetailsOpened, setIsDetailsOpened] = useState(false)
  const { currentList } = useSelector((state) => state.todos)
  const todoList = useSelector((state) => state.todos.lists[currentList].data)
  const todoListName = useSelector(
    (state) => state.todos.lists[currentList].listName
  )
  const uncompletedTodoList = todoList.filter((todo) => !todo.completed)
  const completedTodoList = todoList.filter((todo) => todo.completed)
  const selectedTodoId = useSelector(
    (state) => state.todos.selectedTodo.data.id
  )
  const isSelectedTodo = useSelector(
    (state) => state.todos.selectedTodo.isSelected
  )
  useEffect(() => {
    dispatch(todoListChandged(list))
  }, [list, dispatch])

  const successAddedTodo = true

  function handleClickTodoElement(id) {
    id !== selectedTodoId ? replacementTodo(id) : toggleTodo()
  }

  function replacementTodo(id) {
    dispatch(replaceTodo(id))
    setIsDetailsOpened(true)
  }

  function toggleTodo() {
    if (isSelectedTodo) {
      dispatch(deselectTodo())
      setIsDetailsOpened(false)
      return
    }
    dispatch(selectTodo())
    setIsDetailsOpened(true)
  }

  function hideDetails() {
    setIsDetailsOpened(false)
  }

  const resetTodoDetails = useCallback(() => {
    dispatch(resetTodo())
    setIsDetailsOpened(false)
  }, [dispatch])

  function completeTodoRequest() {
    dispatch(completeTodo({ id: selectedTodoId }))
    resetTodoDetails()
  }

  function restoreTodoRequest() {
    dispatch(restoreTodo({ id: selectedTodoId }))
    resetTodoDetails()
  }

  function deleteTodoRequest() {
    dispatch(deleteTodo({ id: selectedTodoId }))
    resetTodoDetails()
  }

  return (
    <main
      className={
        isOpenedCategoryNavigation
          ? "todo-main todo-main_state_with-nav"
          : "todo-main todo-main_state_without-nav"
      }
      key={0}
    >
      <div className="todo-main__container" key={0}>
        <div className="status-links">
          <div></div>
          <NavLink
            exact
            to={`/app/${list}`}
            isActive={(match, location) => {
              const listLength = list.length
              const slicedLocation = parseInt(
                location.pathname.slice(6 + listLength)
              )

              if (location.pathname === `/app/${list}`) return true
              if (
                !isNaN(slicedLocation) &&
                location.pathname === `/app/${list}/${slicedLocation}`
              )
                return true
            }}
            className="status-links__link"
            activeClassName="status-links__link_active"
          >
            Незавершённые
          </NavLink>
          <NavLink
            exact
            to={`/app/${list}/completed`}
            isActive={(match, location) => {
              const listLength = list.length
              const slicedLocation = parseInt(
                location.pathname.slice(16 + listLength)
              )

              if (location.pathname === `/app/${list}/completed`) return true
              if (
                !isNaN(slicedLocation) &&
                location.pathname === `/app/${list}/completed/${slicedLocation}`
              )
                return true
            }}
            className="status-links__link"
            activeClassName="status-links__link_active"
          >
            Завершённые
          </NavLink>
        </div>

        <Route exact path={`/app/${list}`}>
          <ToolbarUnfinishedTodos
            isSelectedTodo={isSelectedTodo}
            completeTodoRequest={completeTodoRequest}
            deleteTodoRequest={deleteTodoRequest}
          />
          <NewTodo />
          <TodoList
            handleClickTodoElement={handleClickTodoElement}
            resetTodoDetails={resetTodoDetails}
            todoList={uncompletedTodoList}
            selectedTodoId={selectedTodoId}
            isSelectedTodo={isSelectedTodo}
          />
        </Route>
        <Route exact path={`/app/${list}/completed`}>
          <ToolbarCompletedTodos
            deleteTodoRequest={deleteTodoRequest}
            restoreTodoRequest={restoreTodoRequest}
            isSelectedTodo={isSelectedTodo}
          />
          <div className="empty-block"></div>
          <TodoList
            handleClickTodoElement={handleClickTodoElement}
            resetTodoDetails={resetTodoDetails}
            todoList={completedTodoList}
            selectedTodoId={selectedTodoId}
            isSelectedTodo={isSelectedTodo}
          />
        </Route>
      </div>
      <Counters todoListName={todoListName} todoList={todoList} />
      <TodoDetails
        isOpened={isDetailsOpened}
        resetTodoDetails={resetTodoDetails}
        todoListName={todoListName}
        hideDetails={hideDetails}
      />
    </main>
  )
}
