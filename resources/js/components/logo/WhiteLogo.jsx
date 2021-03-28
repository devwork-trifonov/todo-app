import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Logo from "../../../images/logo.svg"

const StyledLogo = styled(Link)`
  margin-bottom: 0.5%;
  flex-shrink: 0;
  background: 49% / 100% no-repeat url(${Logo});
  width: var(--nav-logo-width);
  height: calc(var(--nav-logo-width) / 2.2);
  display: block;
  cursor: pointer;
`

export function WhiteLogo(props) {
  return (
    <StyledLogo
      className={props.className}
      to="/"
      onClick={() => {
        if (document.location.pathname === "/") {
          location.reload()
        }
      }}
    ></StyledLogo>
  )
}
