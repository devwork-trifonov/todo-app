import React from "react"
import styled from "styled-components"

export function Help() {
  return (
    <Main>
      <Header>
        <Wrapper>
          <h1>Центр поддержки</h1>
          <h2>Мы здесь, чтобы помочь!</h2>
        </Wrapper>
      </Header>
    </Main>
  )
}

const Main = styled.main`
  flex: 1 0 80%;
  margin-top: var(--static-nav-height);
`

const Header = styled.header`
  padding: calc(var(--p-x-lg) * 2.5) var(--p-lg);
  color: #fff;
  background-color: #0060bf;
  h1 {
    font-size: var(--fs-larger);
    font-weight: 700;
  }
  h2 {
    font-size: var(--fs-x-lg);
    font-weight: 500;
    opacity: 0.65;
  }
`
const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 970px;
  padding: 0 var(--p-x-lg);
  padding-left: calc(var(--p-x-lg) * 2.5);
`
