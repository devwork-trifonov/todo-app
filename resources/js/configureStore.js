import { createStore, applyMiddleware, compose } from "redux"
import thunkMiddleware from "redux-thunk"
import rootReducer from "./reducers/rootReducer"
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const composeEnhancers = compose
export default function configureStore() {
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  )
}
