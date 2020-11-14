import axios from "axios"

export const REQUEST_ADD_TODO = "REQUEST_ADD_TODO"
export const RECEIVE_ADD_TODO = "RECEIVE_ADD_TODO"
export const REQUEST_TODOS = "REQUEST_TODOS"
export const RECEIVE_TODOS = "RECEIVE_TODOS"
export const ERROR_TODOS = "ERROR_TODOS"
export const SUCCESS_ADDED_TODO = "SUCCESS_ADDED_TODO"
export const RESET_SUCCESS_ADDED_TODO = "RESET_SUCCESS_ADDED_TODO"

export function deleteTodo(todoData) {
  return (dispatch) => {
    dispatch(requestAddTodo())
    return axios
      .post("/todos/delete", { todoData, credentials: "same-origin" })
      .then((response) => response.data)
      .then((json) => dispatch(receiveTodos(json)))
  }
}

export function restoreTodo(todoData) {
  return (dispatch) => {
    dispatch(requestAddTodo())
    return axios
      .post("/todos/restore", { todoData, credentials: "same-origin" })
      .then((response) => response.data)
      .then((json) => dispatch(receiveTodos(json)))
  }
}

export function completeTodo(todoData) {
  return (dispatch) => {
    dispatch(requestAddTodo())
    return axios
      .post("/todos/complete", { todoData, credentials: "same-origin" })
      .then((response) => response.data)
      .then((json) => dispatch(receiveTodos(json)))
  }
}

export function setBody(todoData) {
  return (dispatch) => {
    dispatch(requestAddTodo())
    return axios
      .post("/todos/setBody", { todoData, credentials: "same-origin" })
      .then((response) => response.data)
      .then((json) => dispatch(receiveTodos(json)))
  }
}

export function addTodo(todoData) {
  return (dispatch) => {
    dispatch(requestAddTodo())
    return axios
      .post("/todos/create", {
        todoData,
        credentials: "same-origin",
      })
      .then((response) => response.data)
      .then((json) => {
        dispatch(receiveAddTodo(json))
      })
  }
}

export function fetchTodos() {
  return (dispatch) => {
    dispatch(requestTodos())
    return axios
      .post("/todos", {
        credentials: "same-origin",
      })
      .then((response) => response.data)
      .then(
        (json) => {
          dispatch(receiveTodos(json))
        },
        (error) => dispatch(errorTodos(error))
      )
  }
}

function requestAddTodo() {
  return {
    type: REQUEST_ADD_TODO,
  }
}

function receiveAddTodo(todoData) {
  return {
    type: RECEIVE_ADD_TODO,
    payload: {
      todoData: todoData,
    },
  }
}

function requestTodos() {
  return {
    type: REQUEST_TODOS,
  }
}

function receiveTodos(json) {
  return {
    type: RECEIVE_TODOS,
    payload: {
      data: json,
    },
  }
}

function errorTodos(error) {
  return {
    type: ERROR_TODOS,
    payload: {
      data: error,
    },
  }
}
