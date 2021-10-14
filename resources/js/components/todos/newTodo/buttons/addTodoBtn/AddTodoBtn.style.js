import styled from "styled-components"

export const StyledAddTodoBtn = styled.button`
  padding: 0 var(--p-lg);
  background-color: #2e8ceb;
  color: #ffffff;
  border: 0;
  border-radius: 3px;
  font-size: var(--fs-medium);
  font-weight: 600;
  outline: none;
  height: 2.66rem;
  transition: all 0.1s;
  &:hover {
    box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.3);
    color: #ffffff;
  }
`
