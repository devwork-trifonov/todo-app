import styled from "styled-components"

export const DateList = styled.div`
  ${(props) => `
    left:${props.left};
    top:${props.top};
position: absolute;
    display: block;
    z-index: 11;
    width: 180px;
    padding: 4px 0;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 4px 1px rgba(0,0,0,0.2);`}
`
export const SubmitBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px 10px;
  border-top: 1px solid rgb(229, 229, 229);
`
export const SubmitBtn = styled.button`
  padding: 0 var(--p-lg);
  background-color: #2e8ceb;
  color: #ffffff;
  border: 0;
  border-radius: 3px;
  font-size: var(--fs-medium);
  font-weight: 600;
  outline: none;
  height: 2.66rem;
  transition: all 0.1s;
  text-transform: uppercase;
  &:hover {
    box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.3);
    color: #ffffff;
  }
`
export const WrappedDatepicker = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
  box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  border-radius: 5px;
`

export const DateListElement = styled.div`
  height: 25px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--fs-small);
  cursor: pointer;
  &:hover {
    background-color: #d1e3f5;
  }
`
export const DayOfWeek = styled.div``
export const StyledDate = styled.div`
  color: #868686;
`
export const LastDateListElement = styled(DateListElement)`
  border-top: 1px solid rgb(229, 229, 229);
  padding-top: 4px;
  position: relative;
  ${(props) => {
    if (props.isOpened) return "background-color: #d1e3f5;"
  }}
  ${WrappedDatepicker} {
    display: ${(props) => (props.isOpened ? "block" : "none")};
  }
  ${StyledDate} {
    color: #000000;
  }
`
