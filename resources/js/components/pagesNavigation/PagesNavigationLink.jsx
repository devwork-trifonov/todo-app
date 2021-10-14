import React from "react"
import { Link } from "react-router-dom"

import { WithBorderLink, StyledLink } from "./PagesNavigationLink.style"

export function PagesNavigationLink({
  withBorder,
  href,
  children,
  onClick,
  isDisabled,
}) {
  return withBorder ? (
    <WithBorderLink onClick={onClick}>
      <Link to={href}>{children}</Link>
    </WithBorderLink>
  ) : (
    <StyledLink isDisabled={isDisabled}>
      <Link to={href}>{children}</Link>
    </StyledLink>
  )
}
