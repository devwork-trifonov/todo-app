import React, { useState, useRef, useEffect, useCallback } from "react"
import { TextInput, Buffer } from "./Input.style"

export function Input({
  focusInput,
  handleChangeText,
  isOnlyInput,
  id,
  value,
}) {
  const [inputMinWidth, setInputMinWidth] = useState("")

  const buffer = useRef()
  const input = useRef()

  const handleChangeValue = useCallback(
    (e) => {
      handleChangeText(e.target.value, id)
    },
    [handleChangeText, id]
  )
  useEffect(() => {
    setInputMinWidth(buffer.current.offsetWidth)
  }, [value])

  return (
    <>
      <Buffer ref={buffer}>{value}</Buffer>
      <TextInput
        ref={input}
        type="text"
        style={{ minWidth: `${inputMinWidth}px` }}
        value={value}
        placeholder={isOnlyInput ? "Добавить задачу..." : null}
        onFocus={focusInput}
        onChange={handleChangeValue}
      ></TextInput>
    </>
  )
}
