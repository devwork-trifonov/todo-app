import { fetchNotes } from "./notes"
import { fetchTodos } from "./todos"
import axios from "axios"

export const LOGOUT_USER = "LOGOUT_USER"
export const REQUEST_USER = "REQUEST_USER"
export const RECEIVE_USER = "RECEIVE_USER"
export const ERROR_USER = "ERROR_USER"
export const SET_PASSWORD = "SET_PASSWORD"
export const RESET_PASSWORD_MESSAGE = "RESET_PASSWORD_MESSAGE"

export function setPassword(data) {
  return (dispatch) => {
    return axios
      .put("/account/update-password", { data, credentials: "same-origin" })
      .then((response) => response.data)
      .then((res) => dispatch(responseSetPassword(res)))
  }
}

export function logIn(body) {
  return (dispatch) => {
    return axios.post("/login", body, {}).then(() => {
      dispatch(fetchUser())
      dispatch(fetchNotes())
      dispatch(fetchTodos())
    })
  }
}

export function register(body) {
  return (dispatch) => {
    return axios.post("/register", body, {}).then(() => {
      dispatch(fetchUser())
      dispatch(fetchNotes())
      dispatch(fetchTodos())
    })
  }
}

export function updatePhoto(blob) {
  return (dispatch) => {
    let body = new FormData()
    body.append("photo", blob)
    body.append("_method", "PUT")
    return axios
      .post("/account/update-photo", body, {
        credentials: "same-origin",
      })
      .then(() => dispatch(fetchUser()))
  }
}

export function logoutUser() {
  return (dispatch) => {
    return axios
      .post("/logout", {
        credentials: "same-origin",
      })
      .then(dispatch({ type: LOGOUT_USER }))
  }
}

export default function fetchUser() {
  return (dispatch) => {
    dispatch(requestUser())
    return axios
      .post("/user", {
        credentials: "same-origin",
      })
      .then((response) => response.data)
      .then((res) => {
        if (typeof res === "object") {
          dispatch(receiveUser(res))
        } else {
          dispatch(errorUser())
        }
      })
  }
}

function requestUser() {
  return {
    type: REQUEST_USER,
  }
}

function receiveUser(json) {
  return {
    type: RECEIVE_USER,
    payload: {
      data: json,
    },
  }
}

function errorUser() {
  return {
    type: ERROR_USER,
  }
}

function responseSetPassword(data) {
  const type = Object.keys(data)[0]
  const message = data[Object.keys(data)[0]]
  return {
    type: SET_PASSWORD,
    payload: {
      type,
      message,
    },
  }
}

export function resetPasswordMessage() {
  return {
    type: RESET_PASSWORD_MESSAGE,
  }
}
