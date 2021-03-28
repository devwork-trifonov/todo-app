import React from "react"
import { PagesNavigationLink } from "./PagesNavigationLink"
import { WhiteLogo } from "../../logo/WhiteLogo"
import AccountDropdownContainer from "../../../containers/AccountDropdownContainer"
import { Nav, Container, Ul } from "./AuthenticatePagesNavigation.style"

export function AuthenticatePagesNavigation() {
  return (
    <Nav>
      <Container>
        <WhiteLogo />
        <Ul>
          <PagesNavigationLink href="/tour">Знакомство</PagesNavigationLink>
          <PagesNavigationLink href="/new">Что нового?</PagesNavigationLink>
          <PagesNavigationLink href="/upgrade">Обновить</PagesNavigationLink>
          <PagesNavigationLink href="/help">Помощь</PagesNavigationLink>
          <PagesNavigationLink href="/app">
            Запустить приложение
          </PagesNavigationLink>
        </Ul>
        <AccountDropdownContainer />
      </Container>
    </Nav>
  )
}
