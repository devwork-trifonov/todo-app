import React from "react"
import { Route, Redirect, Switch } from "react-router-dom"

import { Home } from "../pages/Home"
import { Tour } from "../pages/Tour"
import { New } from "../pages/New"
import { Upgrade } from "../pages/Upgrade"
import { Help } from "../pages/Help"
import { Footer } from "../Footer/Footer"
import { UnAuthenticatedPagesNavigation } from "../pagesNavigation/unAuthenticated/UnAuthenticatedPagesNavigation"
import { RegisterPage } from "../auth/register/RegisterPage"
import { Wrapper } from "../pages/PagesWrapper"
import { LoginPage } from "../auth/login/LoginPage"

const withNavAndFooter = (Component, props) => {
  return (
    <Wrapper>
      <UnAuthenticatedPagesNavigation {...props} />
      <Component />
      <Footer />
    </Wrapper>
  )
}
export default function UnAuthenticateApp() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/tour">{withNavAndFooter(Tour)}</Route>
      <Route path="/new">{withNavAndFooter(New)}</Route>
      <Route path="/upgrade">{withNavAndFooter(Upgrade)}</Route>
      <Route path="/help">{withNavAndFooter(Help)}</Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/register">
        <RegisterPage />
      </Route>
      <Redirect from="*" to="/" />
    </Switch>
  )
}
