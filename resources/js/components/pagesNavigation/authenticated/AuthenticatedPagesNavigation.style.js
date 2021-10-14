import styled from "styled-components"

export const Nav = styled.nav`
  width: 100%;
  min-height: var(--static-nav-height);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  font-weight: 700;
  background-color: ${(props) =>
    props.swiper ? "var(--swiper-bg-color)" : "#0060bf"};
  transition: background-color ${(props) => (props.swiper ? "1s" : "0")};
  position: fixed;
  z-index: 10;
  top: 0;
`

export const Container = styled.div`
  margin: 0 auto;
  max-width: 970px;
  padding: 0 var(--p-x-lg);
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  min-height: var(--static-nav-height);
  align-items: center;
  @media (max-width: 777px) {
    flex-wrap: wrap;
  }
`

export const Ul = styled.ul`
  padding: 0 var(--p-x-lg) 0 0;
  margin: 0;
  display: flex;
  flex-shrink: 1;
  flex-grow: 1;
  justify-content: space-around;
  font-size: var(--fs-medium);
  @media (max-width: 777px) {
    padding: 0;
  }
  @media (max-width: 750px) {
    justify-content: flex-end;
  }
`
