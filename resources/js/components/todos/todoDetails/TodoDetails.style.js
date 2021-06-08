import styled from "styled-components"

export const TodoDetails = styled.div`
  position: absolute;
  top: var(--p-lg);
  left: 100%;
  width: 49.8%;
  background-color: #ffffff;
  z-index: 10;
  transition: all 0.3s;
  border-radius: 5px 5px 0 0;
  height: calc(100% - var(--p-lg));
  box-shadow: -2px 0 0 #d9d9d9;
  ${(props) =>
    props.isOpened
      ? "visibility: visible;transform: translateX(-100.2%);"
      : "visibility: hidden;"}
`
