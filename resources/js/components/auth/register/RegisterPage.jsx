import React, { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { nanoid } from "@reduxjs/toolkit"
import { register } from "../../../actions/user"
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
import { RegisterForm } from "./RegisterForm"
import { getName } from "./useFastRegistration/namesGenerator"
import { AlertDialog } from "./useFastRegistration/AlertDialog"

const getFakeRegistrationData = () => {
  const regData = new FormData()
  regData.append("first-name", getName())
  regData.append("last-name", getName())
  regData.append("name", getName())
  regData.append("email", `${nanoid(15)}@mail.ru`)
  regData.append("password", nanoid(10))
  return regData
}

export function RegisterPage() {
  const dispatch = useDispatch()
  const [isOpenedAlert, setIsOpenedAlert] = useState(true)
  const openAlert = () => setIsOpenedAlert(true)
  const closeAlert = useCallback(() => setIsOpenedAlert(false), [])
  const handleConfirmFastRegistration = () => {
    const regData = getFakeRegistrationData()
    closeAlert()
    dispatch(register(regData))
  }
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
      {isOpenedAlert && (
        <AlertDialog
          {...{ handleConfirmFastRegistration, openAlert, closeAlert }}
        />
      )}
    </StyledLoginPage>
  )
}
