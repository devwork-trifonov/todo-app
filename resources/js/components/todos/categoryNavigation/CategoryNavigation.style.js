import styled from "styled-components"
import { Link } from "react-router-dom"

let prevIsOpenedProp

export const Nav = styled.nav`
  @keyframes slideout {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  @keyframes slidein {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-100%);
    }
  }
  padding-top: var(--p-lg);
  padding-left: var(--p-lg);
  max-height: 100%;
  width: var(--category-nav-width);
  position: absolute;
  ${(props) => {
    if (
      props.isOpened &&
      prevIsOpenedProp !== undefined &&
      prevIsOpenedProp !== true
    ) {
      prevIsOpenedProp = props.isOpened
      return " animation: 0.5s linear 1 normal slideout;"
    }
  }}

  ${(props) => {
    if (!props.isOpened && prevIsOpenedProp !== undefined) {
      prevIsOpenedProp = props.isOpened
      return `z-index: 0;
      transform: translateY(-100%);
      animation: .5s linear 1 normal slidein;`
    } else if (!props.isOpened) {
      prevIsOpenedProp = props.isOpened
      return "transform: translateY(-100%);z-index: 0;"
    }
    prevIsOpenedProp = props.isOpened
  }}
`
export const Logo = styled.img`
  width: 100%;
`

export const StyledLink = styled(Link)`
  display: block;
  width: 100%;
  padding-left: var(--p-lg);
  font-size: var(--fs-small);
  text-decoration: none;
  color: black;
`
export const Ul = styled.ul`
  padding-left: var(--p-lg);
  padding-top: var(--p-lg);
  margin: 0;
`
export const Li = styled.li`
  height: 1.83rem;
  line-height: 1.83rem;
  position: relative;
  &:hover {
    background-color: #bfd7ef;
    color: #000;
  }
  ${StyledLink} {
    ${(props) => props.isActive && "color: #0075D2;font-weight: 600;"}
    &:hover {
      ${(props) =>
        props.isActive ? "color: #0075D2;" : "text-decoration: none;"}
    }
  }
`
export const Counter = styled.div`
  position: absolute;
  right: 0.42rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: #c8dcf1;
  border-radius: 2px;
  padding: 0 var(--p-x-s);
  height: 80%;
  line-height: 1.42rem;
  font-size: 0.9rem;
  user-select: none;
  ${(props) => props.isEmpty && "display: none;"}
`
