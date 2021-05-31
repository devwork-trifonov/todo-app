import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Pagination, Autoplay } from "swiper"
import React from "react"
import img1 from "../../../images/hp_steve_1.png"
import img2 from "../../../images/hp_steve_2.png"
import img3 from "../../../images/hp_steve_3.png"
import img4 from "../../../images/hp_steve_4.png"

import {
  Content,
  Clouds,
  BackgroundImage,
  SlideHeader,
  SlideDescription,
  Tasks,
} from "./SwiperSlider.style"

SwiperCore.use([Pagination, Autoplay])

export function SwiperSlider({
  nextSlideHandle,
  prevSlideHandle,
  beforeDestroySwiperHandle,
}) {
  return (
    <Content>
      <Swiper
        spaceBetween={500}
        slidesPerView={1}
        autoplay={{ delay: 1000 }}
        loop={true}
        speed={1000}
        pagination={{
          el: ".swiper-pagination",
          type: "bullets",
        }}
        centeredSlides={true}
        onSlideNextTransitionStart={nextSlideHandle}
        onSlidePrevTransitionStart={prevSlideHandle}
        onBeforeDestroy={beforeDestroySwiperHandle}
      >
        <SwiperSlide>
          <div>
            <Clouds>
              <span>Позвонить Бобу в 5 вечера.</span>
              <span>Купить молоко.</span>
            </Clouds>
            <BackgroundImage
              url={img1}
              w={261}
              h={306}
              margin={"-47px 0 0 12px"}
            />
            <SlideHeader>Получить списки дел из вашей головы.</SlideHeader>
            <SlideDescription>
              Хватит думать о вашем списке дел- позвольте приложению помнить все
              за вас.
            </SlideDescription>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <Tasks>
              <div>
                <span>Купить завтра молоко.</span>
              </div>
              <div>
                <span>Позвонить Бобу в 5 вечера в четверг.</span>
              </div>
            </Tasks>
            <BackgroundImage
              url={img2}
              w={430}
              h={307}
              margin={"17px 0 0 -12px"}
            />
            <SlideHeader>Получай напоминания где угодно.</SlideHeader>
            <SlideDescription>
              Вы больше никогда не забудете о молоке (или о чём-нибудь другом).
            </SlideDescription>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <Tasks>
              <div>
                <span>Купить завтра молоко.</span>
              </div>
              <div>
                <span>Позвонить Бобу в 5 вечера в четверг.</span>
              </div>
            </Tasks>
            <BackgroundImage
              url={img3}
              w={350}
              h={306}
              margin={"18px 0 0 -5px"}
            />
            <SlideHeader>Добьемся цели вместе.</SlideHeader>
            <SlideDescription>
              Делитесь списками и делегируйте задачи другим, чтобы дела
              выполнялись быстрее.
            </SlideDescription>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <BackgroundImage url={img4} w={477} h={433} margin={"15px 0 0 0"} />
            <SlideHeader>Куда бы ты ни пошел.</SlideHeader>
            <SlideDescription>
              Remember To Progress волшебным образом синхронизируется на всех
              ваших устройствах.
            </SlideDescription>
          </div>
        </SwiperSlide>
        <div className="swiper-pagination"></div>
      </Swiper>
    </Content>
  )
}
