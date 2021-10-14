import React from "react"
import { PagesNavigationLink } from "../PagesNavigationLink"
import { WhiteLogo } from "../../logo/WhiteLogo"
import { Nav, Container, Ul } from "./UnAuthenticatedPagesNavigation.style"

export function UnAuthenticatedPagesNavigation(props) {
  return (
    <Nav {...{ swiper: props.swiper }}>
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
          <PagesNavigationLink href="/login">Вход</PagesNavigationLink>
          <PagesNavigationLink withBorder href="/register">
            Подписаться бесплатно
          </PagesNavigationLink>
        </Ul>
      </Container>
    </Nav>
  )
}
