import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Form, Input, Checkbox, Button } from "./LoginForm.style"

import { logIn } from "../../../actions/user"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(true)

  const dispatch = useDispatch()

  function handleEmail(event) {
    setEmail(event.currentTarget.value)
  }

  function handlePassword(event) {
    setPassword(event.currentTarget.value)
  }

  function handleRemember() {
    setRemember((prev) => !prev)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const body = new FormData(e.currentTarget)
    dispatch(logIn(body))
    setEmail("")
    setPassword("")
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Уже были у нас? С возвращением!</h3>
      <Input
        required
        type="email"
        name="email"
        placeholder="Электронная почта"
        value={email}
        onChange={handleEmail}
      />
      <Input
        required
        type="password"
        name="password"
        placeholder="Пароль"
        value={password}
        onChange={handlePassword}
        autoComplete="on"
      />
      <Checkbox>
        <input
          type="checkbox"
          name="remember"
          id="remember"
          checked={remember}
          onChange={handleRemember}
          value="on"
        />
        <label htmlFor="remember">Не выходить из системы</label>
      </Checkbox>
      <Button type="submit">Вход</Button>
    </Form>
  )
}
