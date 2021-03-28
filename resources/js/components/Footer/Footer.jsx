import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import logo from "../../../images/logo2.svg"

export function Footer() {
  return (
    <StyledFooter>
      <Wrapper>
        <Logo></Logo>
        <Links>
          <h4>Компания</h4>
          <ul>
            <li>О проекте</li>
            <li>Задания</li>
            <li>Пресса</li>
            <li>Блог</li>
          </ul>
        </Links>
        <Links className="static-footer__links">
          <h4>Продукт</h4>
          <ul>
            <li>
              <Link to="/tour">Знакомство</Link>
            </li>
            <li>
              <Link to="/new">Что нового</Link>{" "}
            </li>
            <li>Интеграции</li>
            <li>
              <Link to="/upgrade">Обновить</Link>
            </li>
          </ul>
        </Links>
        <Links>
          <h4>Сообщество</h4>
          <ul>
            <li>Форумы</li>
            <li>Программа тестирования</li>
            <li>Переводы</li>
            <li>API</li>
          </ul>
        </Links>
        <Links>
          <h4>Поддержка</h4>
          <ul>
            <li>
              <Link to="/help">Помощь</Link>
            </li>
            <li>Советы и хитрости</li>
            <li>
              <a href="mailto:devwork.trifonov@gmail.com">Связаться с нами</a>
            </li>
          </ul>
        </Links>
      </Wrapper>
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  flex: 0 0 20%;
  border-top: 1px solid #e8e8e8;
  padding: calc(var(--p-x-lg) * 2.5) 0;
`
const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 970px;
  padding: 0 var(--p-x-lg);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`
const Logo = styled.div`
  flex: 0 0 20%;
  background: 49% / 100% no-repeat url(${logo});
`

const Links = styled.div`
  flex: 0 0 15%;
  color: #8b8b94;
  font-size: var(--fs-small);
  > {
    h4 {
      font-weight: 700;
      padding: var(--p-xx-s) 0 var(--p-m) var(--p-lg);
    }
  }
  > {
    ul {
      padding: 0;
      margin: 0;
      > {
        li {
          padding: 0 var(--p-lg);
          line-height: 2rem;
          font-weight: 400;
          cursor: pointer;
          &:hover {
            background-color: #eeeeee;
          }
          > {
            a {
              text-decoration: none;
              display: block;
              color: #8b8b94;
            }
          }
        }
      }
    }
  }
`
