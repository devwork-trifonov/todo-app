import React, { useEffect, useRef } from "react"

import {
  StyledAlert,
  Dialog,
  Header,
  Description,
  Buttons,
  Confirm,
  Close,
} from "./alertDialog.style"

export function AlertDialog({ handleConfirmFastRegistration, closeAlert }) {
  const alert = useRef()

  useEffect(() => {
    const handleClickOutsideAlert = (e) => {
      if (e.target === alert.current || alert.current.contains(e.target)) return
      closeAlert()
    }
    document.addEventListener("click", handleClickOutsideAlert)
    return () => document.removeEventListener("click", handleClickOutsideAlert)
  }, [closeAlert])
  return (
    <StyledAlert>
      <Dialog ref={alert}>
        <Header>Использовать быструю регистрацию?</Header>
        <Description>
          Быстрая регистрация избавит вас от необходимости заполнения формы
          регистрации, что способствует скорейшему ознакомлению с приложением.
        </Description>
        <Buttons>
          <Confirm onClick={handleConfirmFastRegistration}>Ок</Confirm>
          <Close onClick={closeAlert}>Отмена</Close>
        </Buttons>
      </Dialog>
    </StyledAlert>
  )
}
