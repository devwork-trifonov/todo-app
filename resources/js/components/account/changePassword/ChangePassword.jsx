import React, { useState, useEffect } from "react"

import {
  Heading,
  Description,
  StatusMessage,
  Form,
  InputLabel,
  Input,
  SubmitBtn,
} from "./ChangePassword.style"

export function ChangePassword({
  password,
  setPassword,
  resetPasswordMessage,
}) {
  const inputsInitialState = {
    current: "",
    new_password: "",
    new_password_confirmation: "",
  }

  let [inputs, setInputs] = useState(inputsInitialState)
  let [message, setMessage] = useState()

  useEffect(() => {
    setMessage(password.message)
  }, [password])

  function handleInputChange(event) {
    const { name, value } = event.target
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  function sendForm(e) {
    e.preventDefault()
    let data = JSON.stringify(inputs)
    setPassword(data)
    setInputs(inputsInitialState)
  }

  return (
    <>
      <Heading>Изменить пароль</Heading>
      <Description>
        Для изменения пароля введите свой текущий пароль и новый пароль
      </Description>
      <StatusMessage messageType={password.type}>{message}</StatusMessage>
      <Form onSubmit={sendForm}>
        <InputLabel htmlFor="current">
          текущий пароль:
          <Input
            required
            maxLength="16"
            minLength="8"
            name="current"
            type="password"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="off"
            value={inputs.current}
            onChange={handleInputChange}
          />
        </InputLabel>
        <InputLabel htmlFor="new_password">
          Новый пароль:
          <Input
            required
            maxLength="16"
            minLength="8"
            name="new_password"
            type="password"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="off"
            value={inputs.new_password}
            onChange={handleInputChange}
          />
        </InputLabel>
        <InputLabel htmlFor="new_password_confirmation">
          Новый пароль (еще раз):
          <Input
            required
            maxLength="16"
            minLength="8"
            name="new_password_confirmation"
            type="password"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="off"
            value={inputs.new_password_confirmation}
            onChange={handleInputChange}
          />
        </InputLabel>

        <SubmitBtn type="submit">Сменить пароль</SubmitBtn>
      </Form>
    </>
  )
}
