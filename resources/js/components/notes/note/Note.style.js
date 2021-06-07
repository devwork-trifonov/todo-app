import styled from "styled-components"

export const StyledNote = styled.div`
  border-bottom: 1px dotted #e5e5e5;
  padding: var(--p-lg) var(--p-lg) var(--p-lg) calc(var(--p-lg) * 6);
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
export const Input = styled.div`
  cursor: text;
  line-height: 1.25rem;
  font-size: var(--fs-small);
  width: 100%;
  border: none;
  outline: none;
  border-radius: 3px;
  overflow-wrap: break-word;
`
export const InputWrapper = styled.div`
  position: relative;
  box-sizing: content-box;
  border-radius: 3px;
  width: ${(props) => (props.isFocused ? "calc(100% - var(--p-s))" : "100%")};
  height: ${(props) => props.inputHeight + "px"};
  border: ${(props) => (props.isFocused ? "1px solid #2e8ceb" : "none")};
  padding: ${(props) => (props.isFocused ? "var(--p-s)" : "0")};
  outline: none;
  transition: all 0.1s;
`

export const CreateButtons = styled.div`
  display: flex;
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
export const EditButtons = styled.div`
  display: flex;
  font-size: var(--fs-small);
  color: #999;
`

export const EditButton = styled.button`
  &:before {
    content: "\\2022";
    margin-right: var(--m-xx-s);
    color: #999;
  }
  ${StyledNote}:hover & {
    visibility: visible;
  }
  visibility: hidden;
  color: #0058af;
  border: none;
  background-color: #fff;
  padding: 0 var(--p-x-s) 0 0;
  outline: none;
`
