import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DropdownMenu } from "../../DropdownMenu/DropdownMenu"
import { logoutUser } from "../../../actions/user"
import { StyledTopPanel, Wrapper, OpenBtn } from "./TopPanel.style"

const links = [
  {
    to: "/account",
    children: "Аккаунт",
  },
]

export function TopPanel() {
  let [isOpened, setIsOpened] = useState(false)
  let dropdownRef = useRef()
  let dropdownBtn = useRef()
  const dispatch = useDispatch()

  const logout = () => dispatch(logoutUser())
  const { userData } = useSelector((state) => state.user)

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
      event.target !== dropdownBtn.current &&
      !dropdownRef.current.contains(event.target)
    const clickOnInternalLink =
      dropdownRef.current.contains(event.target) &&
      (event.target.tagName === "BUTTON" || event.target.tagName === "A")
    if (event.target === dropdownBtn.current) {
      document.removeEventListener("click", handleClickOutside)
      return
    }
    if (clickOutside || clickOnInternalLink) {
      setIsOpened(false)
      document.removeEventListener("click", handleClickOutside)
    }
  }

  return (
    <StyledTopPanel>
      <Wrapper ref={dropdownRef}>
        <OpenBtn ref={dropdownBtn} onClick={handleOpen}></OpenBtn>
        <DropdownMenu
          user={userData}
          logout={logout}
          isOpened={isOpened}
          links={links}
          margin="2px"
        />
      </Wrapper>
    </StyledTopPanel>
  )
}
