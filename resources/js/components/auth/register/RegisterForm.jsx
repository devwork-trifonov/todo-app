import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Form, Input, Button } from "./RegisterForm.style"
import { register } from "../../../actions/user"

export function RegisterForm() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  function handleSubmit(e) {
    e.preventDefault()
    const body = new FormData(e.currentTarget)
    dispatch(register(body))
    setEmail("")
    setPassword("")
    setFirstName("")
    setLastName("")
    setName("")
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h3>Подключайтесь свободно</h3>
        <Input
          type="text"
          name="first-name"
          required
          placeholder="Имя"
          autoComplete="off"
          value={firstName}
          onChange={(e) => setFirstName(e.currentTarget.value)}
        />
        <Input
          type="text"
          name="last-name"
          required
          placeholder="Фамилия"
          autoComplete="off"
          value={lastName}
          onChange={(e) => setLastName(e.currentTarget.value)}
        />
        <Input
          required
          type="email"
          name="email"
          placeholder="Электронная почта"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <Input
          type="text"
          name="name"
          required
          placeholder="Имя пользователя"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <Input
          required
          type="password"
          name="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          autoComplete="on"
        />
        <Button type="submit">Регистрация</Button>
      </Form>
    </>
  )
}
