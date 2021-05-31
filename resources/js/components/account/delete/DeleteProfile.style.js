import styled from "styled-components"

export const Header = styled.h1`
  margin-bottom: var(--m-x-lg);
  font-size: var(--fs-xx-lg);
`

export const Warning = styled.div`
  font-size: var(--fs-medium);
  line-height: 1.75rem;
  padding: var(--p-x-lg);
  position: relative;
  color: #212121;
  background-color: rgba(234, 82, 0, 0.15);
  border-radius: 5px;
  margin-bottom: var(--m-x-lg);
`

export const NameLabel = styled.span`
  text-transform: uppercase;
  font-size: var(--fs-small);
  font-weight: 700;
`

export const Name = styled.div`
  margin: var(--m-s) 0;
  font-size: var(--fs-medium);
  line-height: 1.33rem;
`

export const Form = styled.form`
  margin-top: 17px;
`

export const PasswordLabel = styled.label`
  margin: 0;
  text-transform: uppercase;
  font-size: var(--fs-small);
  font-weight: 700;
`

export const PasswordInput = styled.input`
  display: block;
  margin-top: var(--m-s);
  height: 3.2rem;
  width: 44%;
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

export const CheckboxWrapper = styled.div`
  margin: var(--m-x-lg) 0;
  font-size: var(--fs-medium);
`

export const CheckboxLabel = styled.label`
  line-height: 1.5rem;
`

export const CheckboxInput = styled.input`
  margin-right: var(--m-lg);
`
export const SubmitBtn = styled.button`
  color: #ffffff;
  border: 0;
  border-radius: 3px;
  font-size: var(--fs-medium);
  font-weight: 600;
  outline: none;
  transition: all 0.1s;

  background-color: #d24b03;
  padding: var(--p-lg) var(--p-x-lg);
  height: 3.5rem;
  &:hover {
    color: #ffffff;
    box-shadow: none;
    background-color: #ca492e;
  }
`
