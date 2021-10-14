import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import Axios from "axios"
import moment from "moment"
import { receiveTodosAfterChanges } from "../../../actions/todos"

const localToUtcZero = (date) => {
  if (date === null) return null
  return moment(date).utc().format("YYYY-MM-DD HH:mm:ss").trim()
}

const postNewTodo = createAsyncThunk(
  "newTodo/postTodoStatus",
  async (arg, thunkAPI) => {
    const state = thunkAPI.getState().newTodo
    const dispatch = thunkAPI.dispatch
    const body = state.dataFields
      .filter((field) => field.type === "input" && field.value.length > 0)
      .map((field) => field.value)
      .join(" ")
    const beginAt =
      state.dataFields.find((field) => field.type === "startDate")?.date || null
    const willEndAt =
      state.dataFields.find((field) => field.type === "dueDate")?.date || null
    let data = {
      body,
      begin_at: localToUtcZero(beginAt),
      will_end_at: localToUtcZero(willEndAt),
    }
    const response = await Axios.post("/todos/create", {
      todoData: data,
    })
    dispatch(receiveTodosAfterChanges(response.data))
  }
)

const sliceInitial = {
  dataFields: [{ id: nanoid(), value: "", type: "input" }],
  isDatepickerWasClosed: false,
  isDateFieldWasClosed: false,
  isFocusedDataFields: false,
  fetchStatus: "fulfilled",
}

const newTodoSlice = createSlice({
  name: "newTodo",
  initialState: sliceInitial,
  reducers: {
    blurDataFields: {
      reducer: (state) => {
        if (state.isDatepickerWasClosed) {
          state.isDatepickerWasClosed = false
          return
        }
        if (state.isDateFieldWasClosed) {
          state.isDateFieldWasClosed = false
          return
        }
        state.isFocusedDataFields = false
      },
    },
    focusDataFields: {
      reducer: (state) => {
        state.isFocusedDataFields = true
      },
    },
    changeText: {
      reducer: (state, action) => {
        state.dataFields.find((item) => item.id === action.payload.id).value =
          action.payload.value
      },

      prepare: (value, id) => {
        return { payload: { value, id } }
      },
    },
    addStartDate: {
      reducer: (state, action) => {
        state.dataFields.push(
          getStartDateField(action.payload),
          getInputField()
        )
        state.isDatepickerWasClosed = true
      },
    },
    deleteStartDate: {
      reducer: (state) => {
        const dateIndex = state.dataFields.findIndex(
          (item) => item.type === "startDate"
        )
        deleteDate(state.dataFields, dateIndex)
        state.isDateFieldWasClosed = true
      },
    },
    addDueDate: {
      reducer: (state, action) => {
        state.dataFields.push(getDueDateField(action.payload), getInputField())
        state.isDatepickerWasClosed = true
      },
    },
    deleteDueDate: {
      reducer: (state) => {
        const dateIndex = state.dataFields.findIndex(
          (item) => item.type === "dueDate"
        )
        deleteDate(state.dataFields, dateIndex)
        state.isDateFieldWasClosed = true
      },
    },
    resetDateFieldWasClosedFlag: {
      reducer: (state) => {
        state.isDateFieldWasClosed = false
      },
    },
    resetDatepickerWasClosedFlag: {
      reducer: (state) => {
        state.isDatepickerWasClosed = false
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postNewTodo.fulfilled, (state, action) => {
      for (const [name, value] of Object.entries(sliceInitial)) {
        state[name] = value
      }
    })
    builder.addCase(postNewTodo.pending, (state, action) => {
      state.fetchStatus = "pending"
    })
    builder.addCase(postNewTodo.rejected, (state, action) => {
      state.fetchStatus = "rejected"
    })
  },
})
function deleteDate(state, dateIndex) {
  state[dateIndex - 1].value += ` ${state[dateIndex + 1].value}`
  if (state[dateIndex + 2]) {
    for (let index = dateIndex + 2; index < state.length; index++) {
      state[index - 2] = state[index]
    }
  }
  state.length = state.length - 2
}

export default newTodoSlice.reducer
export const {
  changeText,
  addStartDate,
  addDueDate,
  deleteStartDate,
  deleteDueDate,
  resetDatepickerWasClosedFlag,
  resetDateFieldWasClosedFlag,
  blurDataFields,
  focusDataFields,
} = newTodoSlice.actions
export { postNewTodo }

function getDueDateField(date) {
  return {
    id: nanoid(),
    date,
    type: "dueDate",
  }
}
function getStartDateField(date) {
  return {
    id: nanoid(),
    date,
    type: "startDate",
  }
}
function getInputField() {
  return {
    id: nanoid(),
    value: "",
    type: "input",
  }
}
