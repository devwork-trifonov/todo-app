import React from "react"
import { useSelector } from "react-redux"
import logo from "../../../../images/logo.svg"
import { CategoryNavigationBurger } from "./CategoryNavigationBurger"
import {
  Nav,
  Logo,
  Ul,
  Li,
  StyledLink,
  Counter,
} from "./CategoryNavigation.style"

const getListLength = (list) => {
  return list.filter((item) => !item.completed).length
}

export function CategoryNavigation({
  toggleCategoryNavigationState,
  isOpenedCategoryNavigation,
}) {
  const { all, today, tommorow, week } = useSelector(
    (state) => state.todos.lists
  )
  const currentList = useSelector((state) => state.todos.currentList)
  const links = [
    {
      to: `/app/all`,
      children: all.listName,
      counter: getListLength(all.data),
    },
    {
      to: `/app/today`,
      children: today.listName,
      counter: getListLength(today.data),
    },
    {
      to: `/app/tommorow`,
      children: tommorow.listName,
      counter: getListLength(tommorow.data),
    },
    {
      to: `/app/week`,
      children: week.listName,
      counter: getListLength(week.data),
    },
  ]

  return (
    <>
      <CategoryNavigationBurger
        toggleCategoryNavigationState={toggleCategoryNavigationState}
        isOpenedCategoryNavigation={isOpenedCategoryNavigation}
      />
      <Nav isOpened={isOpenedCategoryNavigation}>
        <Logo src={logo} alt="logo" />
        <Ul>
          {links.map((link) => (
            <Li key={link.to} isActive={link.to.endsWith(currentList)}>
              <StyledLink to={link.to}>{link.children}</StyledLink>
              <Counter isEmpty={link.counter < 1}>{link.counter}</Counter>
            </Li>
          ))}
        </Ul>
      </Nav>
    </>
  )
}
