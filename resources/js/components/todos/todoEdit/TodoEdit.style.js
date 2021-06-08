import styled from "styled-components"

export const StyledTodoEdit = styled.div`
  padding: var(--p-lg) var(--p-lg) 0;
  border-bottom: 1px dotted #e5e5e5;
  height: 21.76%;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
export const CloseDetailsButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  height: 1.42rem;
  font-size: var(--fs-small);
  color: gray;
  line-height: 1.17rem;
`
export const CloseDetailsWithoutInactivateTodo = styled(CloseDetailsButton)`
  visibility: hidden;
`
export const TodoDetails = styled.div`
  padding: var(--p-lg);
`
export const InputWrapper = styled.div`
  padding: 0 var(--p-x-s);
  border-left: 3px solid #ccc;
`
export const Input = styled.input`
  width: 100%;
  height: 2.12rem;
  border: none;
  outline: none;
  font-size: var(--fs-medium);
  &:focus {
    border: 1px solid #2e8ceb;
    border-radius: 3px;
  }
`
export const DateFields = styled.div`
  padding: var(--p-lg) var(--p-x-lg);
`
export const Date = styled.div`
  height: 1.83rem;
  display: flex;
  font-size: var(--fs-small);
`
export const DateHeading = styled.div`
  flex: 0 0 22%;
  color: #999;
  max-width: 5.8rem;
`
export const DateValue = styled.div`
  flex: 0 0 30%;
  white-space: nowrap;
`
