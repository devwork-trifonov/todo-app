import styled from "styled-components"

export const StyledCounters = styled.div`
  padding: calc(var(--p-lg) * 3) var(--p-x-lg);
  margin-bottom: var(--m-lg);
  border-radius: 5px;
  width: 50%;
  background-color: #e4eef8;
`
export const ListName = styled.h4`
  font-size: var(--fs-lg);
  font-weight: 400;
  margin: var(--m-lg) 0;
`
export const Wrapper = styled.div`
  display: flex;
`
export const CounterContainer = styled.div`
  padding: var(--p-lg) 1.1rem var(--p-s);
  background-color: #dbe8f6;
  margin-right: var(--m-s);
  border-radius: 5px;
  flex: 0 0 25%;
  max-width: 8.4rem;
`
export const Counter = styled.div`
  font-size: var(--fs-lg);
  line-height: 1.67rem;
  font-weight: 600;
`
export const AllTodos = styled(Counter)`
  color: #0060bf;
`
export const ExpiredTodos = styled(Counter)`
  color: #d74a00;
`
export const CompletedTodos = styled(Counter)`
  color: rgba(0, 0, 0, 0.4);
`
export const CounterCaption = styled.span`
  font-size: var(--fs-small);
  line-height: 1.25rem;
`
export const CompletedCaption = styled(CounterCaption)`
  color: rgba(0, 0, 0, 0.4);
`
