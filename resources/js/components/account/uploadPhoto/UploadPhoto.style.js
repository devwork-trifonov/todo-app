import styled from "styled-components"

export const ImgContainer = styled.div`
  position: relative;
  margin: 20px 0;
  background-size: contain;
  background-repeat: no-repeat;
`

export const SubmitBtn = styled.button`
  color: #ffffff;
  border: 0;
  border-radius: 3px;
  font-weight: 600;
  outline: none;
  transition: all 0.1s;

  margin-top: 10px;
  font-size: var(--fs-lg);
  padding: var(--p-lg) var(--p-x-lg);
  background-color: #009dff;
  height: 3.5rem;
  &:hover {
    color: #ffffff;
    background-color: #007ecc;
    box-shadow: none;
  }
`

export const TargetRectangle = styled.div`
  position: absolute;
  &:hover {
    cursor: grab;
  }
  &:active {
    cursor: grabbing;
  }
`
