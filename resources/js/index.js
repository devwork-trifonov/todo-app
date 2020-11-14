import React from "react"
import { render } from "react-dom"
import Root from "./containers/Root"

if (document.getElementById("root")) {
  render(<Root />, document.getElementById("root"))
}
