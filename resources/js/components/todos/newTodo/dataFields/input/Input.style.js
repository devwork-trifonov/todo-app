import styled from "styled-components"

export const TextInput = styled.input`
  font-size: var(--fs-medium);
  height: 100%;
  display: block;
  outline: none;
  white-space: nowrap;
  text-overflow: clip;
  border: none;
  flex: 0 2 1%;
  &:last-child {
    flex: 1 2 20%;
  }
  &::placeholder {
    font-size: var(--fs-small);
  }
  &:focus::-webkit-input-placeholder {
    color: transparent;
  }
`

export const Buffer = styled.div`
  font-size: var(--fs-medium);
  position: absolute;
  padding: 0 2px;
  visibility: hidden;
  top: -1100px;
  white-space: nowrap;
`
