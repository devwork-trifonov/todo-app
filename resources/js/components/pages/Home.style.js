import styled from "styled-components"

export const Main = styled.main`
  flex: 1 0 80%;
  margin-top: var(--static-nav-height);
`
export const Header = styled.header`
  background-color: ${(props) => props.swiperBgColor};
  transition: background-color ${(props) => (props.swiperBgColor ? "1s" : "0")};
  text-align: center;
  padding: calc(var(--p-x-lg) * 2.5) calc(var(--p-x-lg) * 2) var(--p-lg);
  color: #fff;
  h1 {
    font-size: var(--fs-larger);
    font-weight: 700;
    font-family: "Helvetica Neue";
    text-rendering: optimizeLegibility;
  }
  a {
    font-family: "Helvetica Neue";
    display: inline-block;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    border: 1px solid #d24b03;
    background-color: #d24b03;
    color: #fff;
    font-size: var(--fs-x-lg);
    border-radius: 4px;
    text-decoration: none;
    padding: var(--p-lg) calc(var(--p-lg) * 3);
    line-height: 2.7rem;
    margin-top: calc(var(--m-lg) * 3);
    height: 4.5rem;
    transition: background-color 0.1s;
    &:hover {
      background-color: #ca492e;
    }
  }
`

export const Container = styled.div`
  margin: 0 auto;
  max-width: 970px;
  padding: 0 var(--p-x-lg);
`
export const Wrapper = styled.div`
  --swiper-bg-color: ${(props) => props.swiperBgColor};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
