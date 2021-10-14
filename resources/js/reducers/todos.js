import moment from "moment"
import {
  RECEIVE_TODOS,
  TODO_LIST_CHANDGED,
  FETCH_TODOS,
  FAIL_FETCH_TODOS,
  SELECT_TODO,
  DESELECT_TODO,
  REPLACE_TODO,
  RESET_TODO,
  TODOS_RECEIVED_AFTER_CHANGES,
} from "../actions/todos"
import { NOTES_RECEIVED_AFTER_CHANGES } from "../actions/notes"

export const IDLE_STATUS = "idle"
export const LOADING_STATUS = "loading"
export const SUCCESS_STATUS = "success"
export const FAILURE_STATUS = "failure"

const selectedTodoInitialState = { isSelected: false, data: {} }
const todosInitialState = {
  selectedTodo: selectedTodoInitialState,
  currentList: "all",
  lists: {},
  all: [],
  possibleLists: ["all", "today", "tommorow", "week"],
  status: IDLE_STATUS,
}
function prepareTodos(todos, notes) {
  const currentDate = moment({ hour: 0, minute: 0, seconds: 0 })
  function adaptDates(todos) {
    const utcZeroToUserTimeZone = (date) => {
      if (date === null) return null
      const time = moment(new Date(date)).format("YYYY-MM-DD[T]HH:mm:ss")
      return time
    }
    return todos.map((todo) => {
      const outputTodo = { ...todo }
      outputTodo.created_at = utcZeroToUserTimeZone(outputTodo.created_at)
      outputTodo.begin_at = utcZeroToUserTimeZone(outputTodo.begin_at)
      outputTodo.completed_at = utcZeroToUserTimeZone(outputTodo.completed_at)
      outputTodo.updated_at = utcZeroToUserTimeZone(outputTodo.updated_at)
      outputTodo.will_end_at = utcZeroToUserTimeZone(outputTodo.will_end_at)
      return outputTodo
    })
  }
  function insertNotes(todos, notes) {
    for (const todo of todos) {
      todo.notes = notes.filter((note) => note.todo_id === todo.id)
    }
    return todos
  }
  const preparedTodos = insertNotes(adaptDates(todos), notes).map((todo) => {
    if (
      todo.will_end_at &&
      moment(todo.will_end_at).diff(currentDate, "days") < 0 &&
      !todo.completed
    ) {
      return { ...todo, expired: true }
    }
    return { ...todo, expired: false }
  })
  const completedTodos = preparedTodos.filter((todo) => todo.completed)
  const expiredTodos = preparedTodos.filter((todo) => todo.expired)
  const allTodos = preparedTodos.filter((todo) => !todo.expired)
  const todayTodos = preparedTodos
    .filter((todo) => todo.completed_at || todo.will_end_at)
    .filter(
      (todo) =>
        moment(todo.completed_at || todo.will_end_at).diff(
          currentDate,
          "days"
        ) === 0
    )
    .filter((todo) => !todo.expired)
  const tommorowTodos = preparedTodos
    .filter(
      (todo) =>
        todo.will_end_at &&
        moment(todo.will_end_at).diff(currentDate, "days") === 1
    )
    .filter((todo) => !todo.completed)
  let weekTodos = preparedTodos
    .filter(
      (todo) =>
        (todo.will_end_at &&
          moment(todo.will_end_at).diff(currentDate, "days") < 8 &&
          moment(todo.will_end_at).diff(currentDate, "days") >= 0) ||
        (todo.completed_at &&
          moment(todo.completed_at).diff(currentDate, "days") > -8 &&
          moment(todo.completed_at).diff(currentDate, "days") <= 0)
    )
    .filter((todo) => !todo.expired)

  return {
    lists: {
      all: { listName: "Все задачи", data: [...allTodos, ...expiredTodos] },
      today: { listName: "Сегодня", data: [...expiredTodos, ...todayTodos] },
      tommorow: { listName: "Завтра", data: tommorowTodos },
      week: { listName: "Неделя", data: [...expiredTodos, ...weekTodos] },
      completed: { listName: "Выполненные", data: completedTodos },
      expired: { listName: "Просроченные", data: expiredTodos },
    },
    all: [...preparedTodos],
  }
}

export function todos(state = todosInitialState, action) {
  switch (action.type) {
    case FETCH_TODOS:
      return {
        ...state,
        status: LOADING_STATUS,
      }
    case FAIL_FETCH_TODOS:
      return {
        ...state,
        status: FAILURE_STATUS,
      }
    case TODO_LIST_CHANDGED:
      if (!state.possibleLists.includes(action.payload.list)) return state

      return {
        ...state,
        currentList: action.payload.list,
      }
    case RECEIVE_TODOS:
      let lists = {}
      let all = []
      ;({ lists, all } = prepareTodos(
        action.payload.todos,
        action.payload.notes
      ))
      return {
        ...state,
        lists,
        all,
        receivedTodos: action.payload.todos,
        receivedNotes: action.payload.notes,
        status: SUCCESS_STATUS,
      }
    case TODOS_RECEIVED_AFTER_CHANGES:
      ;({ lists, all } = prepareTodos(
        action.payload.todos,
        state.receivedNotes
      ))
      return {
        ...state,
        lists,
        all,
        receivedTodos: action.payload.todos,
      }
    case NOTES_RECEIVED_AFTER_CHANGES:
      ;({ lists, all } = prepareTodos(
        state.receivedTodos,
        action.payload.notes
      ))
      return {
        ...state,
        lists,
        all,
        receivedNotes: action.payload.notes,
        selectedTodo: {
          ...state.selectedTodo,
          data: {
            ...all.find((todo) => todo.id === state.selectedTodo.data.id),
          },
        },
      }
    case REPLACE_TODO:
      return {
        ...state,
        selectedTodo: {
          isSelected: true,
          data: {
            ...state.all.find((todo) => todo.id === action.payload.id),
          },
        },
      }
    case SELECT_TODO:
      return {
        ...state,
        selectedTodo: {
          ...state.selectedTodo,
          isSelected: true,
        },
      }
    case DESELECT_TODO:
      return {
        ...state,
        selectedTodo: {
          ...state.selectedTodo,
          isSelected: false,
        },
      }
    case RESET_TODO:
      return {
        ...state,
        selectedTodo: selectedTodoInitialState,
      }
    default:
      return state
  }
}
