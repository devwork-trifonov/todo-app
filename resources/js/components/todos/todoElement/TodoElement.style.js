import styled from "styled-components"
import selectedCheckbox from "../../../../images/correct.svg"

export const Todo = styled.div`
  height: 2.75rem;
  padding: var(--p-xx-s) var(--p-lg);
  border-bottom: 1px dotted #e5e5e5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  ${(props) => {
    if (props.selected) return "background-color:#ffffcc;"
  }}
  &:hover {
    background-color: #ffffe1;
  }
`
export const Wrapper = styled.div`
  display: flex;
  flex: 1 2 85%;
  align-items: center;
  justify-content: flex-start;
  border-left: 3px solid #cccccc;
  max-width: 90%;
  height: 100%;
`
export const Checkbox = styled.span`
  margin-left: var(--m-lg);
  width: 1.1rem;
  height: 1.1rem;
  border: 1px solid #c1c1c1;
  border-radius: 2px;
  flex-shrink: 0;
  ${(props) => {
    if (props.selected)
      return `background: left 60% / 95% 110% no-repeat url(${selectedCheckbox});`
  }}
`
export const TodoBody = styled.div`
  font-size: var(--fs-small);
  padding: 0 var(--p-m);
  white-space: nowrap;
  overflow: hidden;
  flex: 1 2 80%;
  height: 1.7rem;
  line-height: 1.8rem;
  ${(props) => {
    if (props.expired) return "font-weight: 600;"
    if (props.completed) return "color: #7e7e7e;text-decoration: line-through;"
  }}
`
export const EndDate = styled.div`
  visibility: hidden;
  white-space: nowrap;
  ${(props) => {
    if (props.completed) return "color: #b1b1b1;visibility: visible;"
    if (props.expired) return "color: #ea5200;visibility: visible;"
  }}
`
