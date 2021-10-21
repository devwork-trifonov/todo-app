import styled from "styled-components"

export const StyledButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--p-lg);
  overflow: hidden;
  transition: max-height 0.3s, padding 0.3s;
  max-height: 16.7rem;
  ${(props) => {
    if (!props.isOpened) return "max-height: 0;padding: 0;"
  }}
`
