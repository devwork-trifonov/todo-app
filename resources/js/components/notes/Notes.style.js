import styled from "styled-components"

export const Notes = styled.div`
  max-height: 78.2%;
  display: flex;
  flex-direction: column;
`
export const Header = styled.h3`
  padding: var(--p-x-lg) 0 var(--p-xx-s) var(--p-lg);
  border-bottom: 1px dotted #e5e5e5;
  font-size: var(--fs-lg);
  font-weight: 400;
  margin: 0;
  flex: 0 0 6%;
`
export const NotesWrapper = styled.div`
  overflow-y: scroll;
  flex: 1 1 86%;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.4);
    border-radius: 3px;
    height: 30%;
  }
`
