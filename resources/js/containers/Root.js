import React from "react"
import { Provider } from "react-redux"
import configureStore from "../configureStore"

import { GlobalStyle } from "../globalStyles/globalStyles"
import App from "../containers/App"
import { fetchTodos } from "../actions/todos"
import fetchUser from "../actions/user"
import { fetchNotes } from "../actions/notes"

const store = configureStore()
// document.addEventListener("DOMContentLoaded", () => {
store.dispatch(fetchUser())
// store.dispatch(fetchTodos())
// store.dispatch(fetchNotes())
// })

export default function Root() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  )
}
