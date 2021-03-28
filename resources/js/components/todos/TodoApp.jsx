import React, { useEffect, useState, useReducer, useRef } from "react"
import { Route, NavLink, useParams, Link } from "react-router-dom"
import AddTodoForm from "../forms/AddTodoForm"
import { NavBar } from "../navigation/CategoryNavigation"
import { NavBarBurger } from "../navigation/CategoryNavigationBurger"
import { Note } from "../notes/Note"
import { AddNote } from "../forms/AddNote"
import { TodoEdit } from "./TodoEdit"
import { TodoElement, CompletedTodoElement } from "./TodoElement"
import { DropdownMenu } from "../DropdownMenu/DropdownMenu"

const links = [
  {
    to: "/account",
    children: "Аккаунт",
  },
]

export default function TodoApp({
  todos,
  todayTodos,
  tommorowTodos,
  weekTodos,
  expiredTodos,
  user,
  addTodo,
  successAddedTodo,
  completedTodos,
  notes,
  addNote,
  setBody,
  successReceiveNote,
  setNoteBody,
  deleteNote,
  completeTodo,
  restoreTodo,
  deleteTodo,
  logout,
}) {
  const { list } = useParams()
  const [navBarState, setNavBarState] = useState()
  let [isOpened, setIsOpened] = useState(false)
  let dropdownRef = useRef()
  let dropdownBtn = useRef()
  let todoList
  let todoListName

  useEffect(() => {
    if (window.innerWidth > 992) {
      setNavBarState(true)
    } else setNavBarState(false)
  }, [])

  function toggleNavBarState() {
    setNavBarState((prev) => !prev)
  }

  function handleOpen() {
    if (!isOpened) {
      document.addEventListener("click", handleClickOutside)
    }
    setIsOpened((prev) => !prev)
  }

  function handleClickOutside(event) {
    if (!dropdownRef.current) {
      document.removeEventListener("click", handleClickOutside)
      return
    }
    const clickOutside =
      event.target !== dropdownBtn.current &&
      !dropdownRef.current.contains(event.target)
    const clickOnInternalLink =
      dropdownRef.current.contains(event.target) &&
      (event.target.tagName === "BUTTON" || event.target.tagName === "A")
    if (event.target === dropdownBtn.current) {
      document.removeEventListener("click", handleClickOutside)
      return
    }
    if (clickOutside || clickOnInternalLink) {
      setIsOpened(false)
      document.removeEventListener("click", handleClickOutside)
    }
  }

  function copyArray(arr) {
    return arr.map((item) => {
      return Object.assign({}, item)
    })
  }

  switch (list) {
    case "all":
      todoList = copyArray(todos)
      todoListName = "Все задачи"
      break
    case "today":
      todoList = copyArray(todayTodos)
      todoListName = "Сегодня"
      break
    case "tommorow":
      todoList = copyArray(tommorowTodos)
      todoListName = "Завтра"

      break

    case "week":
      todoList = copyArray(weekTodos)
      todoListName = "Неделя"
      break

    default:
      todoList = copyArray(todos)
      todoListName = "Все задачи"
      break
  }

  return (
    <>
      <div className="todo-top-bar" key={0}>
        <div ref={dropdownRef}>
          <div
            className="todo-top-bar__settings"
            ref={dropdownBtn}
            onClick={handleOpen}
          ></div>
          <DropdownMenu
            user={user}
            logout={logout}
            isOpened={isOpened}
            links={links}
            margin="2px"
          />
        </div>
      </div>
      <div className="todo-app" key={1}>
        <NavBarBurger
          navBarState={navBarState}
          toggleNavBarState={toggleNavBarState}
          todoListName={todoListName}
        />
        <NavBar
          key={0}
          expiredTodos={expiredTodos}
          weekTodos={weekTodos}
          tommorowTodos={tommorowTodos}
          todayTodos={todayTodos}
          todos={todos}
          navBarState={navBarState}
        />

        <Todos
          key={1}
          addTodo={addTodo}
          expiredTodos={expiredTodos}
          successAddedTodo={successAddedTodo}
          completedTodos={completedTodos}
          notes={notes}
          addNote={addNote}
          setBody={setBody}
          todoList={todoList}
          todoListName={todoListName}
          user={user}
          successReceiveNote={successReceiveNote}
          setNoteBody={setNoteBody}
          deleteNote={deleteNote}
          completeTodo={completeTodo}
          restoreTodo={restoreTodo}
          deleteTodo={deleteTodo}
          navBarState={navBarState}
        />
      </div>
    </>
  )
}

function Todos({
  addTodo,
  expiredTodos,
  successAddedTodo,
  notes,
  completedTodos,
  setBody,
  todoList,
  todoListName,
  user,
  addNote,
  successReceiveNote,
  setNoteBody,
  deleteNote,
  completeTodo,
  restoreTodo,
  deleteTodo,
  navBarState,
}) {
  const { list } = useParams()

  const todoDetailsInitialState = {
    isActive: false,
    detailsIsOpened: false,
    todo: { id: -1 },
    earlyTodo: { id: -1 },
    notes: [{ id: -1, body: "" }],
  }

  const TOGGLE_IS_ACTIVE = "TOGGLE_IS_ACTIVE"
  const TODO_SELECTED = "TODO_SELECTED"
  const TODO_SELECTION_REMOVED = "TODO_SELECTION_REMOVED"
  const HIDE_DETAILS = "HIDE_DETAILS"
  const REPLACEMENT_TODO = "REPLACEMENT_TODO"
  const UPDATE_TODO = "UPDATE_TODO"
  const UPDATE_WITHOUT_SET_ACTIVE = "UPDATE_WITHOUT_SET_ACTIVE"
  const RESET_TODO_DETAILS = "RESET_TODO_DETAILS"

  function todoDetailsReducer(state, action) {
    switch (action.type) {
      case TOGGLE_IS_ACTIVE:
        return {
          ...state,
          isActive: !state.isActive,
        }
      case TODO_SELECTED:
        return {
          ...state,
          isActive: true,
          detailsIsOpened: true,
        }
      case TODO_SELECTION_REMOVED:
        return {
          ...state,
          isActive: false,
          detailsIsOpened: false,
        }
      case HIDE_DETAILS:
        return {
          ...state,
          detailsIsOpened: false,
        }
      case REPLACEMENT_TODO:
        return {
          isActive: true,
          detailsIsOpened: true,
          todo: { ...action.payload.todo },
          earlyTodo: { ...action.payload.todo },
          notes: [...action.payload.notes],
        }
      case UPDATE_WITHOUT_SET_ACTIVE:
        return {
          ...state,
          todo: { ...action.payload.todo },
          earlyTodo: { ...action.payload.todo },
          notes: [...action.payload.notes],
        }
      case UPDATE_TODO:
        return {
          ...state,
          todo: { ...state.todo, body: action.payload.body },
        }
      case RESET_TODO_DETAILS:
        return {
          isActive: todoDetailsInitialState.isActive,
          detailsIsOpened: todoDetailsInitialState.detailsIsOpened,
          todo: { ...todoDetailsInitialState.todo },
          earlyTodo: { ...todoDetailsInitialState.earlyTodo },
          notes: [...todoDetailsInitialState.notes],
        }
      default:
        return state
    }
  }

  const [todoDetails, dispatchTodoDetails] = useReducer(
    todoDetailsReducer,
    todoDetailsInitialState,
    undefined
  )

  useEffect(() => {
    if (successReceiveNote && successAddedTodo) {
      const todoNotes = notes
        .filter((note) => note.todo_id === todoDetails.todo.id)
        .map((note) => {
          return { ...note }
        })
      dispatchTodoDetails({
        type: UPDATE_WITHOUT_SET_ACTIVE,
        payload: { todo: todoDetails.todo, notes: todoNotes },
      })
    }
  }, [successReceiveNote, successAddedTodo])

  function taskDetailsHandler(todo) {
    todo.id !== todoDetails.todo.id ? replacementTodo(todo) : toggleTodo()
  }

  function replacementTodo(todo) {
    const todoNotes = notes
      .filter((note) => note.todo_id === todo.id)
      .map((note) => {
        return { ...note }
      })
    dispatchTodoDetails({
      type: REPLACEMENT_TODO,
      payload: { todo, notes: todoNotes },
    })
  }

  function toggleTodo() {
    todoDetails.isActive
      ? dispatchTodoDetails({ type: TODO_SELECTION_REMOVED })
      : dispatchTodoDetails({ type: TODO_SELECTED })
  }

  function updateTodo() {
    if (todoDetails.earlyTodo.body === todoDetails.todo.body) {
      return
    } else {
      setBody({ id: todoDetails.todo.id, body: todoDetails.todo.body })
    }
  }

  function updateTodoHandler(e) {
    if (e.target.value) {
      dispatchTodoDetails({
        type: UPDATE_TODO,
        payload: { body: e.target.value },
      })
    }
  }

  function cancelTodoUpdate() {
    dispatchTodoDetails({
      type: UPDATE_TODO,
      payload: { body: todoDetails.earlyTodo.body },
    })
  }

  function unselectingTodo() {
    dispatchTodoDetails({ type: TODO_SELECTION_REMOVED })
  }

  function hideDetails() {
    dispatchTodoDetails({ type: HIDE_DETAILS })
  }

  function addNoteRequest(body) {
    addNote({ body, todo_id: todoDetails.todo.id })
  }

  function completeTodoRequest() {
    completeTodo({ id: todoDetails.todo.id })
    dispatchTodoDetails({ type: RESET_TODO_DETAILS })
  }

  function restoreTodoRequest() {
    restoreTodo({ id: todoDetails.todo.id })
    dispatchTodoDetails({ type: RESET_TODO_DETAILS })
  }

  function resetTodoDetails() {
    dispatchTodoDetails({ type: RESET_TODO_DETAILS })
  }

  function deleteTodoRequest() {
    deleteTodo({ id: todoDetails.todo.id })
  }

  return (
    <main
      className={
        navBarState
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
          {todoDetails.isActive ? (
            <div className="toolbar">
              <button
                className="toolbar__button toolbar__button_purpose_complete"
                title="Завершить задачу"
                onClick={completeTodoRequest}
              ></button>
              <button
                className="toolbar__button toolbar__button_purpose_delete"
                title="Удалить задачу"
                onClick={deleteTodoRequest}
              ></button>
            </div>
          ) : (
            <div className="toolbar"></div>
          )}
          <AddTodoForm addTodo={addTodo} successAddedTodo={successAddedTodo} />
          <div className="todo-list">
            {/* {list ? ( */}
            <TodoElement
              list={list}
              expiredTodos={expiredTodos}
              todoList={todoList}
              willEndAtStyle={"todo__will-end-at"}
              taskDetailsHandler={taskDetailsHandler}
              todoDetails={todoDetails}
              resetTodoDetails={resetTodoDetails}
            />
            {/* ) : null} */}
          </div>
        </Route>
        <Route exact path={`/app/${list}/completed`}>
          {todoDetails.isActive ? (
            <div className="toolbar">
              <button
                className="toolbar__button toolbar__button_purpose_restore"
                title="Восстановить"
                onClick={restoreTodoRequest}
              ></button>
              <button
                className="toolbar__button toolbar__button_purpose_delete"
                title="Удалить задачу"
                onClick={deleteTodoRequest}
              ></button>
            </div>
          ) : (
            <div className="toolbar"></div>
          )}
          <div className="empty-block"></div>
          <div className="todo-list">
            <CompletedTodoElement
              todoList={completedTodos}
              taskDetailsHandler={taskDetailsHandler}
              todoDetails={todoDetails}
              resetTodoDetails={resetTodoDetails}
            />
          </div>
        </Route>
      </div>
      <div className="additional-info" key={1}>
        <h4>{todoListName}</h4>
        <div className="additional-info__wrapper">
          <div className="counter">
            <div className="tasks">{todoList.length}</div>
            <span>задач(и)</span>
          </div>
          <div className="counter">
            <div className="expired">{expiredTodos.length}</div>
            <span>просрочено</span>
          </div>
          <div className="counter">
            <div className="completed">{completedTodos.length}</div>
            <span className="completed">завершено</span>
          </div>
        </div>
      </div>
      <div
        key={2}
        className={
          todoDetails.detailsIsOpened
            ? "task-details task-details_opened"
            : "task-details"
        }
      >
        <TodoEdit
          todoDetails={todoDetails}
          updateTodo={updateTodo}
          unselectingTodo={unselectingTodo}
          updateTodoHandler={updateTodoHandler}
          cancelTodoUpdate={cancelTodoUpdate}
          todoListName={todoListName}
          hideDetails={hideDetails}
        />
        <div className="task-details__notes-wrapper">
          <h3>Заметки</h3>
          <AddNote
            avatar={user.avatar}
            addNoteRequest={addNoteRequest}
            successReceiveNote={successReceiveNote}
          />
          <div className="task-details__notes">
            {todoDetails.isActive
              ? todoDetails.notes.map((note) => (
                  <Note
                    note={note}
                    avatar={user.avatar}
                    key={note.id}
                    setNoteBody={setNoteBody}
                    deleteNote={deleteNote}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </main>
  )
}
