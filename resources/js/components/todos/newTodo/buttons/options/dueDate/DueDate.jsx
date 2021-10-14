import React from "react"
import { useSelector } from "react-redux"
import { StyledDueDate } from "./DueDate.style"

export function DueDate({ handleSelectDueDate, isOpenedDatePicker }) {
  const { dataFields } = useSelector((state) => state.newTodo)
  const isDueDateSelected = dataFields.find((field) => field.type === "dueDate")
    ? true
    : false
  return (
    <StyledDueDate
      onClick={handleSelectDueDate}
      disabled={isOpenedDatePicker || isDueDateSelected}
      title="Указать дату выполнения"
    ></StyledDueDate>
  )
}
