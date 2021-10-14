import moment from "moment"
import React from "react"
import { useDispatch } from "react-redux"
import { deleteStartDate } from "../../newTodoSlice"
import { PickedDate, Date, Revoke } from "./StartDate.style"

export function StartDate({ date }) {
  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(deleteStartDate())
  }
  return (
    <PickedDate>
      <Date>~ {moment(date).format("DD MMM")}</Date>
      <Revoke onClick={handleDelete}>&#10006;</Revoke>
    </PickedDate>
  )
}
