import React from "react"
import { connect } from "react-redux"
import { setBody } from "../../../actions/todos"
import { TodoDetailsContainer } from "./TodoDetailsContainer"

function TodoDetails(props) {
  return <TodoDetailsContainer {...props} />
}

function mapStateToProps(state) {
  const { todosData } = state.todos
  return {
    todosData,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setBody: (todoData) => dispatch(setBody(todoData)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoDetails)
