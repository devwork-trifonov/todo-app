import styled from "styled-components"

export const PickedDate = styled.div`
  display: flex;
  background-color: #eaf3fa;
  color: #005fbf;
  height: 1.5rem;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  vertical-align: middle;
  padding-left: var(--p-x-s);
  margin: 0 var(--m-x-s);
`
export const Date = styled.div`
  display: inline-block;
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: var(--fs-small);
  white-space: nowrap;
`
export const Revoke = styled.button`
  height: 1.5rem;
  width: 1.5rem;
  line-height: 1.5rem;
  background-color: #eaf3fa;
  border: none;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  font-size: var(--fs-x-small);
  color: #005fbf;
  outline: none;
  opacity: 0.5;
  &:hover {
    opacity: 0.3;
    background-color: #005fbf;
    color: #eaf3fa;
  }
`
