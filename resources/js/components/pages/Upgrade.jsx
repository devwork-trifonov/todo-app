import React from "react"
import styled from "styled-components"

export function Upgrade() {
  return (
    <Main>
      <Header>
        <Wrapper>
          <h1> Делай больше с Pro! </h1>
          <Button>Обновить сейчас</Button>
        </Wrapper>
      </Header>
    </Main>
  )
}

const Button = styled.button`
  color: #ffffff;
  border-radius: 3px;
  font-weight: 600;
  outline: none;
  transition: all 0.1s;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  border: 1px solid #d24b03;
  border-radius: 4px;
  background-color: #d24b03;
  font-size: var(--fs-x-lg);
  padding: var(--p-lg) calc(var(--p-lg) * 3);
  line-height: 2.17rem;
  height: 4.5rem;
  display: block;
  text-decoration: none;
  margin: calc(var(--m-lg) * 3) auto 0;
  &:hover {
    color: #ffffff;
    background-color: #ca492e;
    box-shadow: none;
  }
`

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
    text-align: center;
  }
`
const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 970px;
  padding: 0 var(--p-x-lg);
`
