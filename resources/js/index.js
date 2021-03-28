import React from "react"
import { render } from "react-dom"
import Root from "./containers/Root"
import { BrowserRouter as Router } from "react-router-dom"

if (document.getElementById("root")) {
  render(
    <Router>
      <Root />
    </Router>,
    document.getElementById("root")
  )
}
