import React, { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  addDueDate,
  addStartDate,
  blurDataFields as blurFields,
  focusDataFields as focusFields,
} from "./newTodoSlice"
import { DataFields } from "./dataFields/DataFields"
import { DatePicker } from "../../datepicker/DatePicker"
import { Buttons } from "./buttons/Buttons"
import { StyledNewTodo } from "./NewTodo.style"

let handleSelectDate
const datePickerStyle = {
  top: "50%",
  left: "80px",
}

export function NewTodo() {
  const [isOpenedDatePicker, setIsOpenedDatePicker] = useState(false)
  const { isFocusedDataFields } = useSelector((state) => state.newTodo)

  const dispatch = useDispatch()
  const formRef = useRef()

  const focusDataFields = useCallback(() => {
    dispatch(focusFields())
  }, [dispatch])
  const blurDataFields = useCallback(() => {
    dispatch(blurFields())
  }, [dispatch])
  const openDatePicker = () => {
    setIsOpenedDatePicker(true)
  }
  const closeDatePicker = useCallback(() => {
    setIsOpenedDatePicker(false)
  }, [])

  const selectStartDate = (date) => {
    dispatch(addStartDate(date))
    closeDatePicker()
  }
  const selectDueDate = (date) => {
    dispatch(addDueDate(date))
    closeDatePicker()
  }
  const handleSelectStartDate = () => {
    handleSelectDate = selectStartDate
    openDatePicker()
  }
  const handleSelectDueDate = () => {
    handleSelectDate = selectDueDate
    openDatePicker()
  }

  useEffect(() => {
    const handleClickOutsideForm = (e) => {
      if (e.target === formRef.current) return
      if (formRef.current.contains(e.target)) return
      blurDataFields()
    }
    if (isFocusedDataFields)
      document.addEventListener("click", handleClickOutsideForm)
    else document.removeEventListener("click", handleClickOutsideForm)
    return () => document.removeEventListener("click", handleClickOutsideForm)
  }, [blurDataFields, isFocusedDataFields])

  return (
    <StyledNewTodo ref={formRef}>
      <DataFields
        isFocusedDataFields={isFocusedDataFields}
        focusDataFields={focusDataFields}
      />

      <Buttons
        handleSelectStartDate={handleSelectStartDate}
        handleSelectDueDate={handleSelectDueDate}
        isFocusedDataFields={isFocusedDataFields}
        isOpenedDatePicker={isOpenedDatePicker}
      />
      {isOpenedDatePicker ? (
        <DatePicker
          datePickerStyle={datePickerStyle}
          isOpenedDatePicker={isOpenedDatePicker}
          closeDatePicker={closeDatePicker}
          handleSelectDate={handleSelectDate}
        />
      ) : null}
    </StyledNewTodo>
  )
}
