import React from "react"
import styled from "styled-components"

export function Wrapper(props) {
  return <StyledWrapper>{props.children.map((child) => child)}</StyledWrapper>
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
