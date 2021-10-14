import React from "react"
import { PagesNavigationLink } from "../PagesNavigationLink"
import { WhiteLogo } from "../../logo/WhiteLogo"
import AccountDropdownContainer from "../../../containers/AccountDropdownContainer"
import { Nav, Container, Ul } from "./AuthenticatedPagesNavigation.style"

export function AuthenticatedPagesNavigation() {
  return (
    <Nav>
      <Container>
        <WhiteLogo />
        <Ul>
          <PagesNavigationLink isDisabled href="/tour">
            Знакомство
          </PagesNavigationLink>
          <PagesNavigationLink isDisabled href="/new">
            Что нового?
          </PagesNavigationLink>
          <PagesNavigationLink isDisabled href="/upgrade">
            Обновить
          </PagesNavigationLink>
          <PagesNavigationLink isDisabled href="/help">
            Помощь
          </PagesNavigationLink>
          <PagesNavigationLink href="/app">
            Запустить приложение
          </PagesNavigationLink>
          <AccountDropdownContainer />
        </Ul>
      </Container>
    </Nav>
  )
}
