import styled from "styled-components"

export const StyledAddNote = styled.div`
  border-bottom: 1px dotted #e5e5e5;
  padding: var(--p-lg) var(--p-lg) var(--p-lg) calc(var(--p-lg) * 6);
  flex: 0 0 7.5%;
`
export const InputWrapper = styled.div`
  position: relative;
  border: ${(props) =>
    props.isFocused ? "1px solid #2e8ceb" : "1px solid #D0D3D6"};
  height: ${(props) => props.height + "px"};
  width: ${(props) => (props.isFocused ? "calc(100% - var(--p-s))" : "100%")};
  padding: ${(props) => (props.isFocused ? "var(--p-s)" : "0")};
  border-radius: 3px;
  outline: none;
  transition: all 0.1s;
  box-sizing: content-box;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0.92rem;
    margin-left: -0.42rem;
    border: ${(props) =>
      props.isFocused ? "1px solid #2e8ceb" : "1px solid #D0D3D6"};
    background-color: #ffffff;
    border-width: 0 0 1px 1px;
    width: 0.67rem;
    height: 0.67rem;
    line-height: 0;
    font-size: 0;
    transform: rotate(45deg);
    z-index: 1;
    transition: all 0.1s;
  }
`

export const Input = styled.div`
  cursor: text;
  line-height: 1.25rem;
  width: 100%;
  min-height: ${(props) => props.minHeight + "px"};
  border: none;
  outline: none;
  border-radius: 3px;
  font-size: var(--fs-small);
`
export const Placeholder = styled.div`
  display: ${(props) => (props.isFocused ? "none" : "block")};
  position: absolute;
  color: #999;
  cursor: text;
  top: 0.7rem;
  left: 0.5rem;
  font-size: var(--fs-small);
  line-height: 1.4rem;
`

export const UserPhoto = styled.img`
  position: absolute;
  top: -1px;
  left: -3.33rem;
  width: 2.67rem;
  height: 2.67rem;
  border-radius: 3px;
  overflow: hidden;
  display: block;
`
export const ButtonsWrapper = styled.div`
  display: ${(props) => (props.isFocused ? "flex" : "none")};
  justify-content: flex-start;
  padding-top: var(--p-lg);
`
export const SaveButton = styled.button`
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
export const CancelButton = styled(SaveButton)`
  border: 1px solid #c7cacd;
  background-color: #fbfbfa;
  color: black;
  margin-left: var(--m-m);
  &:hover {
    color: #2e8ceb;
    box-shadow: unset;
  }
`
