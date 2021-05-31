import styled from "styled-components"
import cloud from "../../../images/hp_cloud.png"
import hpAvatar from "../../../images/hp_avatar_30.png"

export const Content = styled.section`
  padding: calc(var(--p-x-lg) * 2.5) 0;
  background-color: var(--swiper-bg-color);
  transition: background-color 1s;
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .swiper-pagination-bullet {
    border: 2px solid rgba(255, 255, 255, 0.5);
    margin: 2px;
    width: 10px;
    height: 10px;
    background-color: transparent;
    opacity: 1;
    cursor: pointer;
  }
  .swiper-pagination-bullet-active {
    background-color: #fff;
  }
`

export const SlideHeader = styled.h2`
  color: #fff;
  font-size: 28px;
  font-weight: 700;
  margin: 33px 20px 8px;
`

export const SlideDescription = styled.p`
  font-size: 20px;
  line-height: 26px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0 auto 5px auto;
  max-width: 440px;
`

export const BackgroundImage = styled.div`
  background: no-repeat url(${(props) => props.url});
  width: ${(props) => props.w}px;
  height: ${(props) => props.h}px;
  margin: ${(props) => props.margin};
  display: inline-block;
`

export const Clouds = styled.div`
  > span {
    padding: 55px 16px 0 20px;
    line-height: 1.3;
    color: rgba(51, 51, 51, 0.9);
    background-image: url(${cloud});
    background-repeat: no-repeat;
    background-size: 166px auto;
    width: 166px;
    height: 166px;
    display: inline-block;
    vertical-align: top;
    white-space: normal;
    box-sizing: border-box;
    font-size: 22px;
    &:first-child {
      margin: 7px 82px 0 0;
    }
    &:last-child {
      margin: 0 0 0 82px;
    }
  }
`

export const Tasks = styled.div`
  margin-top: 46px;
  padding-left: 8px;
  > div {
    display: inline-block;
    vertical-align: top;
    padding: 6px 13px 6px 6px;
    border-radius: 6px;
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 3px 0 rgb(0 0 0 / 10%);
    color: #444;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.2;
    &:first-child {
      margin-right: 120px;
      @media (max-width: 992px) {
        margin-right: 60px;
      }
    }
    &:last-child {
      margin-left: 120px;
      margin-top: 14px;
      @media (max-width: 992px) {
        margin-left: 60px;
      }
    }
    &:before {
      background-image: url(${hpAvatar});
      background-repeat: no-repeat;
      background-size: 30px auto;
      display: inline-block;
      vertical-align: middle;
      width: 36px;
      height: 36px;
      background-color: #0060bf;
      content: "";
      border-radius: 5px;
      background-position: 3px 3px;
      margin: 0 10px 0 0;
    }
  }
`
