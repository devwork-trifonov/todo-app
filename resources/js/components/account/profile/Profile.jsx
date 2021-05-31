import React from "react"
import {
  MainSection,
  Wrapper,
  Avatar,
  Name,
  JoiningDate,
} from "./Profile.style"

export function Profile({ user }) {
  const registrationDate = new Date(user.created_at)
  const registrationDateDDMMYY = ` ${registrationDate.getDate()} ${
    registrationDate.getMonth() + 1
  } ${registrationDate.getFullYear()}`

  return (
    <MainSection>
      <Avatar src={user.avatar} alt="avatar"></Avatar>
      <Wrapper>
        <Name>
          {user.first_name + " "} {user.last_name}
        </Name>
        <JoiningDate>
          <span>Зарегистрирован:</span>
          {registrationDateDDMMYY}
        </JoiningDate>
      </Wrapper>
    </MainSection>
  )
}
