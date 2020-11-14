import React from "react"
import { connect } from "react-redux"

import { logoutUser } from "../actions/user"
import {
  addTodo,
  setBody,
  completeTodo,
  restoreTodo,
  deleteTodo,
} from "../actions/todos"
import { addNote, setNoteBody, deleteNote } from "../actions/notes"
import TodoApp from "../components/todos/TodoApp"
const momentTimezone = require("moment-timezone")
const moment = window.moment
function Todos(props) {
  const {
    logoutUser,
    isFetchingTodos,
    userData,
    todosData,
    successAddedTodo,
    notes,
    successReceiveNote,
  } = props
  const timeZone = momentTimezone.tz.guess()
  const utcZeroToUserTimeZone = (date) => {
    if (date === null) return null
    const time = moment(date).tz(timeZone).format("YYYY-MM-DD[T]HH:mm:ss")
    return time
  }

  const currentDate = moment({ hour: 0, minute: 0, seconds: 0 })

  const formattedTodosData = todosData
    .map((todo) => {
      const newObj = Object.assign({}, todo)
      newObj.created_at = utcZeroToUserTimeZone(newObj.created_at)
      newObj.begin_at = utcZeroToUserTimeZone(newObj.begin_at)
      newObj.completed_at = utcZeroToUserTimeZone(newObj.completed_at)
      newObj.updated_at = utcZeroToUserTimeZone(newObj.updated_at)
      newObj.will_end_at = utcZeroToUserTimeZone(newObj.will_end_at)
      return newObj
    })
    .filter((todo) => !todo.completed)

  const completedTodos = todosData
    .filter((todo) => todo.completed)
    .map((todo) => {
      const newObj = Object.assign({}, todo)
      newObj.created_at = utcZeroToUserTimeZone(newObj.created_at)
      newObj.begin_at = utcZeroToUserTimeZone(newObj.begin_at)
      newObj.completed_at = utcZeroToUserTimeZone(newObj.completed_at)
      newObj.updated_at = utcZeroToUserTimeZone(newObj.updated_at)
      newObj.will_end_at = utcZeroToUserTimeZone(newObj.will_end_at)
      return newObj
    })

  const expiredTodos = formattedTodosData
    .filter((todo) => todo.will_end_at)
    .filter((todo) => moment(todo.will_end_at).diff(currentDate, "days") < 0)
    .map((todo) => {
      return { ...todo, expired: true }
    })

  const allTodos = formattedTodosData.filter((todo) => {
    if (todo.will_end_at) {
      return moment(todo.will_end_at).diff(currentDate, "days") >= 0
    } else return true
  })

  const todayTodos = formattedTodosData
    .filter((todo) => todo.will_end_at)
    .filter((todo) => moment(todo.will_end_at).diff(currentDate, "days") === 0)

  const tommorowTodos = formattedTodosData
    .filter((todo) => todo.will_end_at)
    .filter((todo) => moment(todo.will_end_at).diff(currentDate, "days") === 1)
  const weekTodos = formattedTodosData
    .filter((todo) => todo.will_end_at)
    .filter(
      (todo) =>
        moment(todo.will_end_at).diff(currentDate, "days") < 8 &&
        moment(todo.will_end_at).diff(currentDate, "days") > 0
    )

  return isFetchingTodos ? (
    <h2>Loading...</h2>
  ) : (
    <TodoApp
      todos={allTodos}
      todayTodos={todayTodos}
      tommorowTodos={tommorowTodos}
      weekTodos={weekTodos}
      expiredTodos={expiredTodos}
      user={userData}
      logout={logoutUser}
      addTodo={props.addTodo}
      successAddedTodo={successAddedTodo}
      completedTodos={completedTodos}
      notes={notes}
      addNote={props.addNote}
      setBody={props.setBody}
      successReceiveNote={successReceiveNote}
      setNoteBody={props.setNoteBody}
      deleteNote={props.deleteNote}
      completeTodo={props.completeTodo}
      restoreTodo={props.restoreTodo}
      deleteTodo={props.deleteTodo}
    />
  )
}

function mapStateToProps(state) {
  const { todos } = state
  const { userData } = state.user
  const { isFetchingTodos, todosData, successAddedTodo } = todos
  const { successReceiveNote, notes } = state.notes
  return {
    todos,
    isFetchingTodos,
    todosData,
    userData,
    successAddedTodo,
    successReceiveNote,
    notes,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: () => dispatch(logoutUser()),
    addNote: (note) => dispatch(addNote(note)),
    addTodo: (todoData) => dispatch(addTodo(todoData)),
    setBody: (todoData) => dispatch(setBody(todoData)),
    setNoteBody: (noteData) => dispatch(setNoteBody(noteData)),
    deleteNote: (noteData) => dispatch(deleteNote(noteData)),
    completeTodo: (todoData) => dispatch(completeTodo(todoData)),
    restoreTodo: (todoData) => dispatch(restoreTodo(todoData)),
    deleteTodo: (todoData) => dispatch(deleteTodo(todoData)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos)
