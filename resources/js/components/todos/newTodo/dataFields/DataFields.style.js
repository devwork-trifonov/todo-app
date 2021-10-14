import styled from "styled-components"

export const Wrapper = styled.div`
  width: 100%;
  height: 2.5rem;
  border: 1px solid #d0d3d6;
  border-radius: 3px;
  overflow: hidden;
  padding: var(--p-x-s);

  ${(props) => {
    if (props.isFocusedDataFields) {
      return "border: 1px solid #2e8ceb;"
    }
  }}
`
export const StyledDataFields = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 100%;
  width: max-content;
`
