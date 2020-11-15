import React, { useState } from "react"

export default function DeleteProfile({ user, deleteProfile }) {
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
      //   deleteProfile(JSON.stringify({ password: inputs.password }))
      deleteProfile({ password: inputs.password })
    }
  }

  return (
    <div className="delete-profile">
      <h1>Закрыть ваш профиль</h1>
      <div className="delete-profile__warning">
        Ты удаляешь свою учётную запись в Remember to progress. Это также удалит
        всю информацию, которая с ней связана. Пожалуйста, введи пароль для
        подтверждения.
      </div>

      <span className="delete-profile__name-label">имя пользователя</span>
      <div className="delete-profile__name">
        {user.first_name + " "} {user.last_name}
      </div>

      <form onSubmit={(e) => deleteProfileSubmit(e)}>
        <label className="delete-profile__password-label" htmlFor="password">
          пароль
        </label>
        <input
          className="delete-profile__password-input"
          type="password"
          name="password"
          id="password"
          value={inputs.password}
          onChange={handleInputChange}
        />

        <div className="delete-profile__checkbox">
          <input
            type="checkbox"
            name="confirmation"
            id="confirmation"
            checked={inputs.confirmation}
            onChange={handleInputChange}
          />
          <label
            htmlFor="confirmation"
            className="delete-profile__checkbox-label"
          >
            Да, я хочу удалить свою учётную запись.
          </label>
        </div>
        <button className="btn btn_style_dangerous" type="submit">
          Удалить учётную запись
        </button>
      </form>
    </div>
  )
}
