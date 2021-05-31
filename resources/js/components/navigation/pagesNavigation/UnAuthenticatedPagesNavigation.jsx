import React from "react"
import { PagesNavigationLink } from "./PagesNavigationLink"
import { WhiteLogo } from "../../logo/WhiteLogo"
import { Nav, Container, Ul } from "./UnAuthenticatedPagesNavigation.style"

export function UnAuthenticatedPagesNavigation(props) {
  return (
    <Nav {...{ swiper: props.swiper }}>
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
