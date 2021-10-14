import styled from "styled-components"
import completeBtnImg from "../../../../images/correct.svg"
import deleteBtnImg from "../../../../images/trash.svg"

export const Toolbar = styled.div`
  padding: var(--p-lg);
  min-height: 4.05rem;
  display: flex;
  flex: 0 0 5.3%;
`
export const Button = styled.button`
  border: 1px solid #d0d3d6;
  outline: none;
  border-radius: 3px;
  width: 4.4rem;
  height: 2.4rem;
  display: block;
  &:last-child {
    margin-left: 5px;
  }
`
export const CompleteButton = styled(Button)`
  background: #fff 49% / 40% no-repeat url(${completeBtnImg});
`
export const DeleteButton = styled(Button)`
  background: #fff 49% / 35% no-repeat url(${deleteBtnImg});
`
