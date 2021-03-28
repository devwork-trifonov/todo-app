import React from "react"
import { RegisterForm } from "./RegisterForm"
import {
  StyledLoginPage,
  Slogan,
  SloganLogo,
  Message,
  Avatars,
  Avatar1,
  Avatar2,
  Avatar3,
  Phrase,
  FormWrapper,
  Header,
  FormLogo,
  LoginLink,
} from "./RegisterPage.style"

export function RegisterPage() {
  return (
    <StyledLoginPage>
      <Slogan>
        <SloganLogo />
        <Message>
          <Avatars>
            <Avatar1 />
            <Avatar2 />
            <Avatar3 />
          </Avatars>
          <Phrase>
            Присоединяйтесь к миллионам людей ставшими более организованными и
            продуктивными!
          </Phrase>
        </Message>
      </Slogan>
      <FormWrapper>
        <Header>
          <FormLogo />
          <LoginLink to="/login">Вход</LoginLink>
        </Header>
        <RegisterForm />
      </FormWrapper>
    </StyledLoginPage>
  )
}
