import styled from "styled-components"

export const Heading = styled.h1`
  margin-bottom: var(--m-x-lg);
  font-size: var(--fs-xx-lg);
  font-weight: 500;
`

export const Description = styled.span`
  margin-bottom: var(--m-x-lg);
  font-size: var(--fs-medium);
  display: block;
`
export const StatusMessage = styled.div`
  display: ${(props) => (props.messageType ? "block" : "none")};
  background-color: ${(props) => {
    if (!props.messageType) return
    return props.messageType === "success"
      ? "rgba(0, 182, 79,0.15)"
      : "rgba(234, 82, 0, 0.15)"
  }};
  margin: var(--m-x-lg) 0;
  padding: var(--p-lg) var(--p-x-lg);
  font-size: var(--fs-medium);
  line-height: 2.5rem;
  border-radius: 5px;
  width: 80%;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const InputLabel = styled.label`
  text-transform: uppercase;
  font-size: var(--fs-small);
  margin-top: var(--m-lg);
  margin-bottom: var(--m-s);
  font-weight: 600;
  width: 44%;
`

export const Input = styled.input`
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

export const SubmitBtn = styled.button`
  color: #ffffff;
  border: 0;
  border-radius: 3px;
  font-weight: 600;
  outline: none;
  transition: all 0.1s;
  margin-top: var(--m-x-lg);
  font-size: var(--fs-lg);
  padding: var(--p-lg) var(--p-x-lg);
  background-color: #009dff;
  height: 3.5rem;
  &:hover {
    background-color: #007ecc;
    box-shadow: none;
    color: #ffffff;
  }
`
