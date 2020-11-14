import React, { useState } from "react"

export function Login({ elementClassName, action }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(true)

  function submit(e) {
    e.preventDefault()
    const body = new FormData(e.currentTarget)
    action(body)
    setEmail("")
    setPassword("")
  }

  return (
    <>
      <form className={`login ${elementClassName}`} onSubmit={submit}>
        <h3>Уже были у нас? С возвращением!</h3>
        <input
          required
          type="email"
          name="email"
          className="input login__input"
          placeholder="Электронная почта"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          required
          type="password"
          name="password"
          className="input login__input"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          autoComplete="on"
        />
        <div className="login__checkbox-wrapper">
          <input
            type="checkbox"
            name="remember"
            className="login__checkbox"
            checked={remember}
            onChange={() => setRemember((prev) => !prev)}
            value="on"
          />
          <label htmlFor="remember" className="login__checkbox-label">
            Не выходить из системы
          </label>
        </div>
        <button
          type="submit"
          className="btn btn_purpose_account-actions login__btn"
        >
          Вход
        </button>
      </form>
    </>
  )
}
