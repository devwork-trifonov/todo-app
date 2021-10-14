import styled from "styled-components"

export const StyledAlert = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const Dialog = styled.div`
  background-color: rgba(255, 255, 255, 1);
  padding: 0 20px 20px;
  border-radius: 3px;
  @media screen and (min-width: 600px) {
    width: 600px;
  }
  @media screen and (max-width: 600px) {
    width: 80%;
  }
`
export const Header = styled.h2`
  margin 20px 0;
`
export const Description = styled.div`
  margin 20px 0;
  font-size: var(--fs-medium);
`

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const Button = styled.button`
  padding: 0 10px;
  min-width: 60px;
  height: 30px;
  margin-left: 10px;
  border: none;
  border-radius: 3px;
  background-color: white;
  font-size: var(--fs-medium);
  transition: background-color 0.2s;
  &:hover {
    background-color: rgba(0, 157, 255, 0.2);
  }
`
export const Confirm = styled(Button)``
export const Close = styled(Button)``
