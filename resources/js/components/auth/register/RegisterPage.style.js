import styled from "styled-components"
import { Link } from "react-router-dom"

import { WhiteLogo } from "../../logo/WhiteLogo"
import { BlueLogo } from "../../logo/BlueLogo"
import AvatarImg1 from "../../../../images/person_avatar_1.svg"
import AvatarImg2 from "../../../../images/person_avatar_2.svg"
import AvatarImg3 from "../../../../images/person_avatar_3.svg"

export const StyledLoginPage = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
`

export const Slogan = styled.div`
  background-color: #0060bf;
  flex-basis: 50%;
  padding: 0 var(--p-x-lg);
  @media (max-width: 767px) {
    display: none;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    padding-left: calc(var(--p-x-lg) + 4%);
  }
  @media (min-width: 992px) {
    padding-left: calc(var(--p-x-lg) + 11%);
  }
`

export const SloganLogo = styled(WhiteLogo)`
  margin: 15px 0 0;
`
export const Message = styled.div`
  color: #fff;
  margin-top: calc(20 * var(--m-lg));
`
export const Avatars = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  margin-right: var(--m-x-lg);
  flex-shrink: 0;
`

export const Avatar1 = styled(Avatar)`
  background: rgba(53, 154, 255, 0.5) 50% 100% / 60% no-repeat
    url(${AvatarImg1});
`
export const Avatar2 = styled(Avatar)`
  background: #2ab27b 50% 100% / 70% no-repeat url(${AvatarImg2});
`

export const Avatar3 = styled(Avatar)`
  background: #359aff 50% 100% / 60% no-repeat url(${AvatarImg3});
`

export const Phrase = styled.p`
  color: #fff;
  opacity: 0.5;
  font-size: var(--fs-xx-lg);
`

export const FormWrapper = styled.div`
  flex-basis: 50%;
  padding: 0 var(--p-x-lg);
  @media (max-width: 556px) {
    flex-basis: 70%;
  }
`

export const Header = styled.div`
  max-width: 445px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const FormLogo = styled(BlueLogo)`
  visibility: hidden;
  @media (max-width: 767px) {
    visibility: visible;
  }
`

export const LoginLink = styled(Link)`
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  white-space: nowrap;
  border-radius: 3px;
  background-color: rgba(0, 96, 191, 0.1);
  color: rgba(0, 0, 0, 0.5);
  font-size: var(--fs-medium);
  font-weight: 600;
  padding: var(--p-s) var(--p-lg);
  &:hover {
    background-color: rgba(0, 70, 140, 0.1);
  }
`
