import styled from "styled-components"
import startDateImg from "../../../../../../../images/calendar.svg"
export const StyledStartDate = styled.button`
  margin-right: var(--m-lg);
  width: 1.83rem;
  height: 1.83rem;
  border: none;
  padding: 0;
  background-color: #fff;
  background-size: cover;
  background-repeat: no-repeat;
  outline: none;
  background-image: url(${startDateImg});
  &:disabled {
    opacity: 0.2;
  }
`
