import React, { useCallback, useEffect, useRef, useState } from "react"
import { default as DatePickerCalendar, registerLocale } from "react-datepicker"
import ru from "date-fns/locale/ru"
import moment from "moment"
import {
  DateList,
  DateListElement,
  DayOfWeek,
  StyledDate,
  LastDateListElement,
  WrappedDatepicker,
  SubmitBtn,
  SubmitBtnWrapper,
} from "./DatePicker.style"

registerLocale("ru", ru)
moment.locale("ru")

const getDate = (offset = 0) =>
  moment({ hour: 0, minute: 0, seconds: 0 }).add(offset, "days")

const days = [
  {
    dayOfWeek: "Сегодня",
    date: getDate().format("DD MMM"),
    dateForHandler: getDate(),
  },
  {
    dayOfWeek: "Завтра",
    date: getDate(1).format("DD MMM"),
    dateForHandler: getDate(1),
  },
  {
    dayOfWeek: getDate(2).format("dddd"),
    date: getDate(2).format("DD MMM"),
    dateForHandler: getDate(2),
  },
  {
    dayOfWeek: getDate(3).format("dddd"),
    date: getDate(3).format("DD MMM"),
    dateForHandler: getDate(3),
  },
  {
    dayOfWeek: getDate(4).format("dddd"),
    date: getDate(4).format("DD MMM"),
    dateForHandler: getDate(4),
  },
  {
    dayOfWeek: getDate(7).format("[1 неделя]"),
    date: getDate(7).format("DD MMM"),
    dateForHandler: getDate(7),
  },
  {
    dayOfWeek: "Нет даты",
    date: "не указано",
    dateForHandler: null,
  },
]

export function DatePicker({
  datePickerStyle,
  handleSelectDate,
  isOpenedDatePicker,
  closeDatePicker,
}) {
  const [isOpenedCalendar, setIsOpenedCalendar] = useState(false)
  const [startDate, setStartDate] = useState(new Date())

  const datePicker = useRef()
  const openCalendar = () => {
    if (isOpenedCalendar) return
    setIsOpenedCalendar(true)
  }
  const closeCalendar = useCallback(() => {
    if (!isOpenedCalendar) return
    setIsOpenedCalendar(false)
  }, [isOpenedCalendar])
  useEffect(() => {
    if (!isOpenedDatePicker) closeCalendar()
  }, [closeCalendar, isOpenedDatePicker])
  useEffect(() => {
    const handleClickOutsideDateList = (e) => {
      if (e.target === datePicker.current) return
      if (datePicker.current.contains(e.target)) return
      closeDatePicker()
    }
    if (isOpenedDatePicker)
      document.addEventListener("click", handleClickOutsideDateList)
    else document.removeEventListener("click", handleClickOutsideDateList)
    return () =>
      document.removeEventListener("click", handleClickOutsideDateList)
  }, [closeDatePicker, isOpenedDatePicker])
  return (
    <DateList {...datePickerStyle} ref={datePicker}>
      {days.map((day) => (
        <DateListElement
          key={day.date}
          onMouseMove={closeCalendar}
          onClick={() => handleSelectDate(day.dateForHandler)}
        >
          <DayOfWeek>{day.dayOfWeek}</DayOfWeek>
          <StyledDate>{day.date}</StyledDate>
        </DateListElement>
      ))}
      <LastDateListElement
        isOpened={isOpenedCalendar}
        onMouseOver={openCalendar}
      >
        <DayOfWeek>Календарь</DayOfWeek>
        <StyledDate>&#9658;</StyledDate>
        <WrappedDatepicker>
          <DatePickerCalendar
            selected={startDate}
            onChange={setStartDate}
            locale="ru"
            inline={true}
            shouldCloseOnSelect={false}
          >
            <SubmitBtnWrapper>
              <SubmitBtn onClick={() => handleSelectDate(startDate)}>
                ок
              </SubmitBtn>
            </SubmitBtnWrapper>
          </DatePickerCalendar>
        </WrappedDatepicker>
      </LastDateListElement>
    </DateList>
  )
}
