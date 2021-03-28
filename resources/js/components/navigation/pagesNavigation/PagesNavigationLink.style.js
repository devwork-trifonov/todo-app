import styled from "styled-components"

export const StyledLink = styled.li`
  display: block;
  list-style: none;
  & a {
    padding: var(--p-x-s) var(--p-x-s);
    opacity: 0.8;
    color: #fff;
    line-height: 2.75rem;
    text-decoration: none;
    white-space: nowrap;
    transition: opacity 0.1s;
    &:hover {
      opacity: 1;
    }
  }
`

export const WithBorderLink = styled(StyledLink)`
  & a {
    padding: 0 var(--p-lg);
    line-height: 2.4rem;
    border: 2px solid rgb(255, 255, 255);
    border-radius: 5px;
    height: 2.83rem;
    display: block;
  }
`
