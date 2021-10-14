import moment from "moment"
import React from "react"
import { useDispatch } from "react-redux"
import { deleteDueDate } from "../../newTodoSlice"
import { PickedDate, Date, Revoke } from "./DueDate.style"

export function DueDate({ date }) {
  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(deleteDueDate())
  }
  return (
    <PickedDate>
      <Date>^ {moment(date).format("DD MMM")}</Date>
      <Revoke onClick={handleDelete}>&#10006;</Revoke>
    </PickedDate>
  )
}
