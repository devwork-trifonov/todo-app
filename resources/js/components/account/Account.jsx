import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, useLocation } from "react-router-dom"
import { AccountRoutes } from "./AccountRoutes"
import {
  StyledLink,
  StyledLinkActive,
  Main,
  ContentWrapper,
  Content,
  AccountNav,
  Header,
  Wrapper,
} from "./Account.style"

let links = [
  {
    path: "/account",
    key: 1,
    children: "Обзор",
  },
  {
    path: "/account/password",
    key: 2,
    children: "Изменить пароль",
  },
  {
    path: "/account/avatar",
    key: 3,
    children: "Сменить фото",
  },
  {
    path: "/account/delete",
    key: 4,
    children: "Закрыть профиль",
  },
]

export default function Account(props) {
  let [pathname, setPathname] = useState(useLocation().pathname)

  useEffect(() => {
    if (pathname.endsWith("/")) {
      setPathname(pathname.slice(0, -1))
    }
  })

  function Links({ links }) {
    return links.map((link) => {
      return (
        <li key={link.key}>
          {link.path === pathname ? (
            <StyledLinkActive
              onClick={() => setPathname(link.path)}
              to={link.path}
            >
              {link.children}
            </StyledLinkActive>
          ) : (
            <StyledLink onClick={() => setPathname(link.path)} to={link.path}>
              {link.children}
            </StyledLink>
          )}
        </li>
      )
    })
  }

  return (
    <Router>
      <Main>
        <Header>
          <Wrapper>
            <h1>Account</h1>
            <h2>Ваша учетная запись</h2>
          </Wrapper>
        </Header>
        <ContentWrapper>
          <AccountNav>
            <ul>
              <Links links={links} />
            </ul>
          </AccountNav>
          <Content>
            <AccountRoutes {...props} />
          </Content>
        </ContentWrapper>
      </Main>
    </Router>
  )
}
