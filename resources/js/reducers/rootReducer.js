import { combineReducers } from "redux";
import { user } from "./user";
import { notes } from "./notes";
import { todos } from "./todos";

const rootReducer = combineReducers({ user: user, todos: todos, notes: notes });
export default rootReducer;
