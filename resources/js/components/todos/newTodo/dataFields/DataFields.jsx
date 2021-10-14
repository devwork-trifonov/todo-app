import React, { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { changeText } from "../newTodoSlice"
import { StartDate } from "./startDate/StartDate"
import { DueDate } from "./dueDate/DueDate"
import { Input } from "./input/Input"
import { StyledDataFields, Wrapper } from "./DataFields.style"

export function DataFields({ focusDataFields, isFocusedDataFields }) {
  const { dataFields } = useSelector((state) => state.newTodo)
  const dispatch = useDispatch()
  const handleChangeText = useCallback(
    (value, id) => {
      dispatch(changeText(value, id))
    },
    [dispatch]
  )
  const isOnlyInput = dataFields.length === 1
  return (
    <Wrapper
      isFocusedDataFields={isFocusedDataFields}
      onMouseDown={focusDataFields}
    >
      <StyledDataFields>
        {dataFields.map((field) => {
          if (field.type === "input") {
            return (
              <Input
                key={field.id}
                {...{ ...field, handleChangeText, isOnlyInput }}
              />
            )
          }
          if (field.type === "dueDate") {
            return <DueDate key={field.id} {...field} />
          }
          if (field.type === "startDate") {
            return <StartDate key={field.id} {...field} />
          }
        })}
      </StyledDataFields>
    </Wrapper>
  )
}
