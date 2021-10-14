import styled from "styled-components"
let prevIsOpenedProp

export const Burger = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const Wrapper = styled.div`
  position: absolute;
  padding-left: 0.75rem;
  top: 0.5rem;
  left: 2rem;
  height: 2.5rem;
  min-width: 3rem;
  max-width: ${(props) =>
    !props.isOpened && props.isOpened !== undefined ? "10rem" : "3rem"};
  cursor: pointer;
  border-radius: 3px;
  display: flex;
  align-items: center;
  z-index: 10;
  transition: max-width 0.5s;
  overflow: hidden;
  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
    ${BurgerLine} {
      opacity: 0.95;
    }
  }
`
export const BurgerLine = styled.div`
  width: 1.5rem;
  height: 0.17rem;
  background-color: white;
  border-radius: 3px;
  opacity: 0.7;
  &:nth-child(2) {
    margin: 0.25rem 0;
  }
`

export const ListName = styled.div`
  @keyframes textin {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  @keyframes textout {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100%);
    }
  }
  height: 2.5rem;
  color: white;
  font-size: var(--fs-small);
  white-space: nowrap;
  padding: 0 0.9rem;
  line-height: 2.8rem;
  flex-shrink: 1;
  ${(props) => {
    if (!props.isOpened && prevIsOpenedProp !== undefined) {
      prevIsOpenedProp = props.isOpened
      return "animation: .4s linear 1 normal textin"
    } else if (props.isOpened && prevIsOpenedProp !== undefined) {
      prevIsOpenedProp = props.isOpened
      return "animation: .4s linear 1 normal textout;"
    }
    prevIsOpenedProp = props.isOpened
  }}
`
