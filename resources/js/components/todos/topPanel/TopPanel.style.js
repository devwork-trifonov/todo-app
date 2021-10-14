import styled from "styled-components"
import gear from "../../../../images/gear.svg"

export const Wrapper = styled.div``
export const OpenBtn = styled.div`
  cursor: pointer;
  width: 3.92rem;
  height: 2.5rem;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 3px;
  transition: background-color 0.1s;
  position: relative;
  &::before {
    content: "";
    background: rgba(0, 0, 0, 0) 45% / 55% no-repeat url(${gear});
    opacity: 0.7;
    position: absolute;
    top: 0;
    left: 0;
    width: 3.92rem;
    height: 2.5rem;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
    &::before {
      opacity: 0.95;
    }
  }
`

export const StyledTopPanel = styled.div`
  height: 3.33rem;
  background-color: #0060bf;
  position: relative;
  z-index: 9;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: var(--p-lg);
`
