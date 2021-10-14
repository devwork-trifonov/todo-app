import axios from "axios"

export const REQUEST_ADD_TODO = "REQUEST_ADD_TODO"
export const RECEIVE_ADDED_TODOS = "RECEIVE_ADDED_TODOS"
export const REQUEST_TODOS = "REQUEST_TODOS"
export const RECEIVE_TODOS = "RECEIVE_TODOS"
export const ERROR_TODOS = "ERROR_TODOS"
export const SUCCESS_ADDED_TODO = "SUCCESS_ADDED_TODO"
export const RESET_SUCCESS_ADDED_TODO = "RESET_SUCCESS_ADDED_TODO"
export const TODO_LIST_CHANDGED = "TODO_LIST_CHANDGED"
export const FETCH_TODOS = "FETCH_TODOS"
export const FAIL_FETCH_TODOS = "FAIL_FETCH_TODOS"
export const SELECT_TODO = "SELECT_TODO"
export const DESELECT_TODO = "DESELECT_TODO"
export const REPLACE_TODO = "REPLACE_TODO"
export const RESET_TODO = "RESET_TODO"
export const TODOS_RECEIVED_AFTER_CHANGES = "TODOS_RECEIVED_AFTER_CHANGES"

export function todoListChandged(list) {
  return { type: TODO_LIST_CHANDGED, payload: { list } }
}

export function replaceTodo(id) {
  return { type: REPLACE_TODO, payload: { id } }
}
export function selectTodo() {
  return { type: SELECT_TODO }
}
export function deselectTodo() {
  return { type: DESELECT_TODO }
}
export function resetTodo() {
  return { type: RESET_TODO }
}

export function deleteTodo(todoData) {
  return (dispatch) => {
    return axios
      .post("/todos/delete", { todoData })
      .then((response) => response.data)
      .then((todos) => dispatch(receiveTodosAfterChanges(todos)))
  }
}

export function restoreTodo(todoData) {
  return (dispatch) => {
    return axios
      .post("/todos/restore", { todoData })
      .then((response) => response.data)
      .then((todos) => dispatch(receiveTodosAfterChanges(todos)))
  }
}

export function completeTodo(todoData) {
  return (dispatch) => {
    return axios
      .post("/todos/complete", { todoData })
      .then((response) => response.data)
      .then((todos) => dispatch(receiveTodosAfterChanges(todos)))
  }
}

export function setBody(todoData) {
  return (dispatch) => {
    return axios
      .post("/todos/setBody", { todoData })
      .then((response) => response.data)
      .then((todos) => dispatch(receiveTodosAfterChanges(todos)))
  }
}

export function addTodo(todoData) {
  return (dispatch) => {
    dispatch(requestAddTodo())
    return axios
      .post("/todos/create", {
        todoData,
      })
      .then((response) => response.data)
      .then((todos) => {
        dispatch(receiveTodosAfterChanges(todos))
      })
  }
}

export function fetchTodos() {
  return (dispatch) => {
    dispatch({ type: FETCH_TODOS })
    return Promise.all([
      axios.post("/todos").then((response) => response.data),
      axios.post("/notes").then((response) => response.data),
    ])
      .then((result) => dispatch(receiveTodos(...result)))
      .catch((result) => dispatch(handleFailFetchTodos(result)))
  }
}
function receiveTodosAfterChanges(todos) {
  return { type: TODOS_RECEIVED_AFTER_CHANGES, payload: { todos } }
}
const handleFailFetchTodos = (result) => {
  return {
    type: FAIL_FETCH_TODOS,
    payload: result,
  }
}

function requestAddTodo() {
  return {
    type: REQUEST_ADD_TODO,
  }
}

function receiveTodos(todos, notes) {
  return {
    type: RECEIVE_TODOS,
    payload: {
      todos,
      notes,
    },
  }
}
export { receiveTodosAfterChanges }
