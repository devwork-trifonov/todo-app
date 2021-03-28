import React from "react"
import { LoginForm } from "./LoginForm"
import {
  StyledLoginPage,
  Slogan,
  SloganLogo,
  Message,
  Phrase,
  Author,
  FormWrapper,
  Header,
  FormLogo,
  RegisterLink,
} from "./LoginPage.style"

export function LoginPage() {
  return (
    <StyledLoginPage>
      <Slogan>
        <SloganLogo />
        <Message>
          <Phrase>
            «Доверяя свои мечты и цели бумаге, вы начинаете превращаться в
            человека, которым больше всего хотели бы быть. Пусть ваше будущее
            будет в надежных руках — ваших собственных.»
          </Phrase>
          <Author>— Марк Виктор Хансен</Author>
        </Message>
      </Slogan>
      <FormWrapper>
        <Header>
          <FormLogo />
          <RegisterLink to="/register">Подписаться бесплатно</RegisterLink>
        </Header>
        <LoginForm />
      </FormWrapper>
    </StyledLoginPage>
  )
}
