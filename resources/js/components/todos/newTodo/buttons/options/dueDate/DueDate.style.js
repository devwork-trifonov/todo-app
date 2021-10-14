import styled from "styled-components"
import dueDateImg from "../../../../../../../images/date.svg"
export const StyledDueDate = styled.button`
  margin-right: var(--m-lg);
  width: 1.83rem;
  height: 1.83rem;
  border: none;
  padding: 0;
  background-color: #fff;
  background-size: cover;
  background-repeat: no-repeat;
  outline: none;
  background-image: url(${dueDateImg});
  &:disabled {
    opacity: 0.2;
  }
`
