import React, { useState } from "react"
import { Link } from "react-router-dom"
import { SwiperSlider } from "../swiper/SwiperSlider"
import { UnAuthenticatePagesNavigation } from "../navigation/pagesNavigation/UnAuthenticatePagesNavigation"
import { Footer } from "../Footer/Footer"

import { Main, Header, Container, Wrapper } from "./Home.style"

import { createColorGenerator } from "../swiper/createColorGenerator"

const colors = ["#0060bf", "#3292f2", "#6a4ca6", "#5bb84d"]

let [nextColor, previousColor] = createColorGenerator(colors)

const beforeDestroySwiperHandle = () => {
  ;[nextColor, previousColor] = createColorGenerator(colors)
}
export function Home() {
  const [swiperBgColor, setSwiperBgColor] = useState()
  const nextSlideHandle = () => {
    setSwiperBgColor(nextColor())
  }
  const prevSlideHandle = () => {
    setSwiperBgColor(previousColor())
  }
  return (
    <Wrapper swiperBgColor={swiperBgColor}>
      <UnAuthenticatePagesNavigation swiper={true} />
      <Main>
        <Header swiperBgColor={swiperBgColor}>
          <Container>
            <h1>Универсальное приложение-список для занятых людей.</h1>
            <Link to="/register">Зарегистрироваться</Link>
          </Container>
        </Header>
        <SwiperSlider
          nextSlideHandle={nextSlideHandle}
          prevSlideHandle={prevSlideHandle}
          beforeDestroySwiperHandle={beforeDestroySwiperHandle}
        />
      </Main>
      <Footer />
    </Wrapper>
  )
}
