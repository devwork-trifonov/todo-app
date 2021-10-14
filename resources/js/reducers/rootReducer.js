import { combineReducers } from "redux"
import { user } from "./user"
import { todos } from "./todos"
import newTodo from "../components/todos/newTodo/newTodoSlice"

const rootReducer = combineReducers({ user, todos, newTodo })
export default rootReducer
