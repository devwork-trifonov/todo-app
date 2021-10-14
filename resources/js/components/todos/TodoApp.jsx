import React, { useEffect, useState } from "react"
import { CategoryNavigation } from "./categoryNavigation/CategoryNavigation"
import { TopPanel } from "./topPanel/TopPanel"
import { useSelector } from "react-redux"
import { TodosContainer } from "./todosContainer/TodosContainer"
import {
  LOADING_STATUS,
  FAILURE_STATUS,
  SUCCESS_STATUS,
} from "../../reducers/todos"

export function TodoApp() {
  const fetchTodosStatus = useSelector((state) => state.todos.status)
  const [isOpenedCategoryNavigation, setIsOpenedCategoryNavigation] = useState()

  useEffect(() => {
    if (window.innerWidth > 992) {
      setIsOpenedCategoryNavigation(true)
    } else setIsOpenedCategoryNavigation(false)
  }, [])

  function toggleCategoryNavigationState() {
    setIsOpenedCategoryNavigation((prev) => !prev)
  }
  return (
    <>
      {fetchTodosStatus === LOADING_STATUS ? (
        <div>Loading...</div>
      ) : fetchTodosStatus === SUCCESS_STATUS ? (
        <>
          <TopPanel />
          <div className="todo-app" key={1}>
            <CategoryNavigation
              isOpenedCategoryNavigation={isOpenedCategoryNavigation}
              toggleCategoryNavigationState={toggleCategoryNavigationState}
            />
            <TodosContainer
              isOpenedCategoryNavigation={isOpenedCategoryNavigation}
            />
          </div>
        </>
      ) : (
        <div>ERROR</div>
      )}

      {/* <TodoList /> */}
    </>
  )
}
