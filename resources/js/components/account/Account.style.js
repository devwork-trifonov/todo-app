import { Link } from "react-router-dom"
import styled from "styled-components"

export const Main = styled.main`
  flex: 1 0 80%;
  margin-top: var(--static-nav-height);
`

export const Header = styled.header`
  padding: calc(var(--p-x-lg) * 2.5) var(--p-lg);
  color: #fff;
  background-color: #0060bf;
  h1 {
    font-size: var(--fs-larger);
    font-weight: 700;
  }
  h2 {
    font-size: var(--fs-x-lg);
    font-weight: 500;
    opacity: 0.65;
  }
`
export const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 970px;
  padding: 0 var(--p-x-lg);
  padding-left: calc(var(--p-x-lg) * 2.5);
`

export const ContentWrapper = styled.section`
  padding: 56px 15px 48px;
  margin: auto;
  max-width: 970px;
  display: flex;
`

export const Content = styled.article`
  flex-grow: 1;
  padding: 0 0 0 var(--p-x-lg);
`

export const AccountNav = styled.nav`
  flex: 0 0 26%;
  font-weight: 400;
  display: block;
  font-size: var(--fs-medium);
  > ul {
    list-style: none;
    padding: 0;
    margin: 0;
    > li {
      display: block;
    }
  }
`

export const StyledLink = styled(Link)`
  border-bottom: 1px solid #e8e8e8;
  border-radius: 0;
  color: #333333;
  padding: var(--p-s);
  font-size: var(--fs-medium);
  text-decoration: none;
  display: block;
  transition: background-color 0.1s;
  &:hover {
    border-radius: 4px;
    background-color: #eeeeee;
  }
`

export const StyledLinkActive = styled(StyledLink)`
  color: #ffffff;
  font-weight: 600;
  background-color: #0060bf;
  border-radius: 4px;
  &:hover {
    background-color: #0060bf;
  }
`
