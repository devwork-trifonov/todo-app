import React, { useRef, useState } from "react"
import styled from "styled-components"

import { DropdownMenu } from "../DropdownMenu/DropdownMenu"

const links = [
  {
    to: "/account",
    children: "Аккаунт",
  },
]

export function AccountDropdown({ user, logout }) {
  let [isOpened, setIsOpened] = useState(false)
  let dropdownRef = useRef()
  let imgRef = useRef()

  function handleOpen() {
    if (!isOpened) {
      document.addEventListener("click", handleClickOutside)
    }
    setIsOpened((prev) => !prev)
  }

  function handleClickOutside(event) {
    if (!dropdownRef.current) {
      document.removeEventListener("click", handleClickOutside)
      return
    }
    const clickOutside =
      event.target !== imgRef.current &&
      !dropdownRef.current.contains(event.target)
    const clickOnInternalLink =
      dropdownRef.current.contains(event.target) &&
      (event.target.tagName === "BUTTON" || event.target.tagName === "A")
    if (event.target === imgRef.current) {
      document.removeEventListener("click", handleClickOutside)
      return
    }
    if (clickOutside || clickOnInternalLink) {
      setIsOpened(false)
      document.removeEventListener("click", handleClickOutside)
    }
  }

  return (
    <Dropdown ref={dropdownRef}>
      <img
        onClick={() => {
          handleOpen()
        }}
        ref={imgRef}
        src={user.avatar}
        alt="avatar"
      ></img>
      <DropdownMenu
        isOpened={isOpened}
        user={user}
        logout={logout}
        links={links}
        margin="-9px"
      ></DropdownMenu>
    </Dropdown>
  )
}

const Dropdown = styled.div`
  position: relative;
  height: 32px;
  > img {
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    cursor: pointer;
    border-radius: 10%;
    height: 32px;
    width: 32px;
  }
`
