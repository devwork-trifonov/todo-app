import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

export function DropdownMenu({ user, logout, isOpened, links, margin }) {
  return (
    <StyledDropdownMenu isOpened={isOpened} margin={margin}>
      <DropdownMenuDetails>
        <Avatar src={user.avatar} alt="avatar"></Avatar>
        <div>
          <UserName>
            {user.first_name} {user.last_name}
          </UserName>
          <UserEmail>{user.email}</UserEmail>
        </div>
      </DropdownMenuDetails>
      <LinksWrapper>
        {links.map((link) => (
          <StyledLink key={link.to} to={link.to}>
            {link.children}
          </StyledLink>
        ))}
      </LinksWrapper>
      <LogoutButton onClick={logout}>Выйти</LogoutButton>
    </StyledDropdownMenu>
  )
}

const StyledDropdownMenu = styled.div`
  display: ${(props) => (props.isOpened ? "block" : "none")};
  position: absolute;
  top: 100%;
  z-index: 10;
  padding: var(--p-s) 0;
  margin: 2px 0 0;
  margin-right: ${(props) => props.margin};
  font-size: var(--fs-medium);
  text-align: left;
  list-style: none;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 3px;
  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  margin-top: 8px;
  right: 0.5rem;
  left: auto;
  &::before {
    position: absolute;
    display: inline-block;
    content: "";
    top: -9px;
    right: 16px;
    border-right: 8px solid transparent;
    border-bottom: 9px solid #fff;
    border-left: 8px solid transparent;
  }
`

const DropdownMenuDetails = styled.div`
  display: flex;
  padding: var(--p-lg);
  font-size: var(--fs-medium);
  line-height: 1.67rem;
  border-bottom: 1px solid #d0d3d6;
  white-space: nowrap;
`
const LogoutButton = styled.button`
  background-color: #ffffff;
  border: 0;
  border-radius: 0;
  color: #333333;
  font-weight: 400;
  display: block;
  width: 100%;
  padding: var(--p-x-s) var(--p-lg);
  font-size: var(--fs-medium);
  text-align: left;
  text-decoration: none;
  transition: background-color 0.07s;
  &:hover {
    background-color: #d1e3f5;
  }
`
const LinksWrapper = styled.div`
  padding-top: var(--p-s);
`

const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 10%;
`

const UserName = styled.div`
  font-weight: 700;
  margin-left: var(--m-m);
`
const UserEmail = styled.div`
  margin-left: var(--m-m);
  font-weight: 400;
`

const StyledLink = styled(Link)`
  background-color: #ffffff;
  border: 0;
  border-radius: 0;
  color: #333333;
  font-weight: 400;
  display: block;
  width: 100%;
  padding: var(--p-x-s) var(--p-lg);
  font-size: var(--fs-medium);
  text-align: left;
  text-decoration: none;
  transition: background-color 0.07s;
  &:hover {
    background-color: #d1e3f5;
  }
`
