import React from "react"
import { Route, Redirect, Switch } from "react-router-dom"

import { Tour } from "../pages/Tour"
import { New } from "../pages/New"
import { Upgrade } from "../pages/Upgrade"
import { Help } from "../pages/Help"
import Account from "../account/Account"
import { Footer } from "../Footer/Footer"
import { AuthenticatedPagesNavigation } from "../pagesNavigation/authenticated/AuthenticatedPagesNavigation"
import { TodoApp } from "../todos/TodoApp"
import { Wrapper } from "../pages/PagesWrapper"

export default function AuthenticateApp({
  user,
  updatePhoto,
  resetPasswordMessage,
  setPassword,
  password,
  deleteProfile,
}) {
  function withNavAndFooter(Component, props) {
    return (
      <Wrapper>
        <AuthenticatedPagesNavigation />
        <Component {...props} />
        <Footer />
      </Wrapper>
    )
  }

  return (
    <Switch>
      <Route path="/app/:list">
        <TodoApp />
      </Route>
      <Route path="/tour">{withNavAndFooter(Tour)}</Route>
      <Route path="/new">{withNavAndFooter(New)}</Route>
      <Route path="/upgrade">{withNavAndFooter(Upgrade)}</Route>
      <Route path="/help">{withNavAndFooter(Help)}</Route>
      <Route path="/account">
        {withNavAndFooter(Account, {
          user,
          updatePhoto,
          resetPasswordMessage,
          setPassword,
          password,
          deleteProfile,
        })}
      </Route>
      <Redirect from="*" to="/app/all" />
    </Switch>
  )
}
