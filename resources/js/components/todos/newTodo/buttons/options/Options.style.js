import styled from "styled-components"

export const StyledOptions = styled.div`
  ${(props) => {
    if (!props.isVisible) return "visibility: hidden;"
  }}
`
