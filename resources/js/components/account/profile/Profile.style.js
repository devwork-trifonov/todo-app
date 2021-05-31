import styled from "styled-components"

export const MainSection = styled.div`
  display: flex;
  background-color: rgba(27, 125, 223, 0.09);
  padding: var(--p-x-lg);
  overflow: hidden;
  color: #515151;
  border-radius: 4px;
  font-size: var(--fs-x-lg);
  line-height: 2rem;
`
export const Avatar = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 3px;
  vertical-align: middle;
`

export const Wrapper = styled.div`
  padding-left: var(--p-x-lg);
`
export const Name = styled.div`
  font-weight: 600;
  margin-top: var(--m-s);
`

export const JoiningDate = styled.div`
  margin-top: var(--m-lg);
  > span {
    font-weight: 600;
  }
`
