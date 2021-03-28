import React from "react"
import { PagesNavigationLink } from "./PagesNavigationLink"
import { WhiteLogo } from "../../logo/WhiteLogo"
import { Nav, Container, Ul } from "./UnAuthenticatePagesNavigation.style"

export function UnAuthenticatePagesNavigation() {
  return (
    <Nav>
      <Container>
        <WhiteLogo />
        <Ul>
          <PagesNavigationLink href="/tour">Знакомство</PagesNavigationLink>
          <PagesNavigationLink href="/new">Что нового?</PagesNavigationLink>
          <PagesNavigationLink href="/upgrade">Обновить</PagesNavigationLink>
          <PagesNavigationLink href="/help">Помощь</PagesNavigationLink>
          <PagesNavigationLink href="/login">Вход</PagesNavigationLink>
          <PagesNavigationLink withBorder href="/register">
            Подписаться бесплатно
          </PagesNavigationLink>
        </Ul>
      </Container>
    </Nav>
  )
}
