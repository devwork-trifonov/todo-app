import React from "react"
import { StartDate } from "./startDate/StartDate"
import { DueDate } from "./dueDate/DueDate"
import { StyledOptions } from "./Options.style"

export function Options({
  isInputHasText,
  isOpenedDatePicker,
  handleSelectStartDate,
  handleSelectDueDate,
}) {
  return (
    <StyledOptions isVisible={isInputHasText}>
      <DueDate
        handleSelectDueDate={handleSelectDueDate}
        isOpenedDatePicker={isOpenedDatePicker}
      />
      <StartDate
        handleSelectStartDate={handleSelectStartDate}
        isOpenedDatePicker={isOpenedDatePicker}
      />
    </StyledOptions>
  )
}
