import React from "react"
import { useSelector } from "react-redux"
import {
  Wrapper,
  Burger,
  BurgerLine,
  ListName,
} from "./CategoryNavigationBurger.style"

export function CategoryNavigationBurger({
  toggleCategoryNavigationState,
  isOpenedCategoryNavigation,
}) {
  const todoListName = useSelector(
    (state) => state.todos.lists[state.todos.currentList].listName
  )
  return (
    <Wrapper
      isOpened={isOpenedCategoryNavigation}
      onClick={toggleCategoryNavigationState}
    >
      <Burger>
        <BurgerLine></BurgerLine>
        <BurgerLine></BurgerLine>
        <BurgerLine></BurgerLine>
      </Burger>
      <ListName isOpened={isOpenedCategoryNavigation}>{todoListName}</ListName>
    </Wrapper>
  )
}
