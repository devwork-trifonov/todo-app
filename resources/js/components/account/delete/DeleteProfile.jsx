import React, { useState } from "react"

import {
  Header,
  Warning,
  NameLabel,
  Name,
  Form,
  PasswordLabel,
  PasswordInput,
  CheckboxWrapper,
  CheckboxLabel,
  CheckboxInput,
  SubmitBtn,
} from "./DeleteProfile.style"

export function DeleteProfile({ user, deleteProfile }) {
  const inputsInitialState = {
    password: "",
    confirmation: false,
  }
  let [inputs, setInputs] = useState(inputsInitialState)

  function handleInputChange(event) {
    const { name, value, checked } = event.target
    name === "password"
      ? setInputs((prevState) => ({
          ...prevState,

          [name]: value,
        }))
      : setInputs((prevState) => ({
          ...prevState,

          [name]: checked,
        }))
  }

  function deleteProfileSubmit(e) {
    e.preventDefault()
    if (inputs.confirmation === true && inputs.password.length > 7) {
      deleteProfile({ password: inputs.password })
    }
  }

  return (
    <div>
      <Header>Закрыть ваш профиль</Header>
      <Warning>
        Ты удаляешь свою учётную запись в Remember to progress. Это также удалит
        всю информацию, которая с ней связана. Пожалуйста, введи пароль для
        подтверждения.
      </Warning>

      <NameLabel>имя пользователя</NameLabel>
      <Name>
        {user.first_name + " "} {user.last_name}
      </Name>

      <Form onSubmit={(e) => deleteProfileSubmit(e)}>
        <PasswordLabel htmlFor="password">пароль</PasswordLabel>
        <PasswordInput
          type="password"
          name="password"
          id="password"
          value={inputs.password}
          onChange={handleInputChange}
        />

        <CheckboxWrapper>
          <CheckboxInput
            type="checkbox"
            name="confirmation"
            id="confirmation"
            checked={inputs.confirmation}
            onChange={handleInputChange}
          />
          <CheckboxLabel htmlFor="confirmation">
            Да, я хочу удалить свою учётную запись.
          </CheckboxLabel>
        </CheckboxWrapper>
        <SubmitBtn type="submit">Удалить учётную запись</SubmitBtn>
      </Form>
    </div>
  )
}
