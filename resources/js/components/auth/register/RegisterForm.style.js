import styled from "styled-components"

export const Form = styled.form`
  max-width: 445px;
  min-height: 25%;
  margin: calc(13 * var(--m-lg)) var(--m-lg) 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > h3 {
    margin: var(--m-x-lg) 0;
    font-size: var(--fs-x-lg);
  }
`

export const Input = styled.input`
  margin-top: var(--m-lg);
  display: block;
  margin-top: var(--m-s);
  height: 3.2rem;
  width: 100%;
  padding: var(--p-m) var(--p-lg) var(--p-s);
  font-size: var(--fs-lg);
  color: #555555;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  &:focus {
    outline: 0;
    border-color: #66afe9;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgba(102, 175, 233, 0.6);
  }
`
export const Button = styled.button`
  color: #ffffff;
  border: 0;
  border-radius: 3px;
  font-weight: 600;
  outline: none;
  transition: all 0.1s;
  font-size: var(--fs-lg);
  padding: var(--p-lg) var(--p-x-lg);
  background-color: #009dff;
  height: 3.5rem;
  margin-top: var(--m-x-lg);
  &:hover {
    color: #ffffff;
    background-color: #007ecc;
    box-shadow: none;
  }
`
