import React from "react"
import { useSelector } from "react-redux"
import { StyledStartDate } from "./StartDate.style"

export function StartDate({ handleSelectStartDate, isOpenedDatePicker }) {
  const { dataFields } = useSelector((state) => state.newTodo)
  const isStartDateSelected = dataFields.find(
    (field) => field.type === "startDate"
  )
    ? true
    : false
  return (
    <StyledStartDate
      onClick={handleSelectStartDate}
      disabled={isOpenedDatePicker || isStartDateSelected}
      title="Указать начальную дату задачи"
    ></StyledStartDate>
  )
}
