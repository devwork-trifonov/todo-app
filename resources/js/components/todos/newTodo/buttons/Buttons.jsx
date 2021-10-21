import React from "react"
import { StyledButtons } from "./buttons.style.js"
import { Options } from "./options/Options"
// import { AddTodoBtn } from "./addTodoBtn/AddTodoBtn"
import { useSelector } from "react-redux"

export function Buttons({
  isFocusedDataFields,
  isOpenedDatePicker,
  handleSelectDueDate,
  handleSelectStartDate,
}) {
  let isInputHasText = false
  const { dataFields, fetchStatus } = useSelector((state) => state.newTodo)
  for (const field of dataFields) {
    if (field.type === "input" && field.value) {
      isInputHasText = true
      break
    }
  }
  return (
    <StyledButtons isOpened={isFocusedDataFields}>
      <Options
        isOpenedDatePicker={isOpenedDatePicker}
        isInputHasText={isInputHasText}
        handleSelectStartDate={handleSelectStartDate}
        handleSelectDueDate={handleSelectDueDate}
      />
      {/* <AddTodoBtn isInputHasText={isInputHasText} fetchStatus={fetchStatus} /> */}
    </StyledButtons>
  )
}
