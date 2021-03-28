import React from "react"
import { Link } from "react-router-dom"

import { WithBorderLink, StyledLink } from "./PagesNavigationLink.style"

export function PagesNavigationLink({ withBorder, href, children }) {
  return withBorder ? (
    <WithBorderLink>
      <Link to={href}>{children}</Link>
    </WithBorderLink>
  ) : (
    <StyledLink>
      <Link to={href}>{children}</Link>
    </StyledLink>
  )
}
