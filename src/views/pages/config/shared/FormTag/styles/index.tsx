import styled from "styled-components";

export const FormTag = styled.form`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  select,
  textarea,
  input,
  button {
    width: 300px;
    background: #f7f7f7;
    color: #232323;
    margin: 5px;
    font-size: 16px;
    font-weight: 400;
    line-height: 2;
    transition: all 0.4s;
    border: 1px solid #666;
    padding: 8px 15px;
    border-radius: 4px;
    text-transform: capitalize;

    ::placeholder {
      color: #232323;
      text-transform: capitalize;
    }
  }

  input {
    height: 36px;
  }

  textarea {
    height: 60px;
  }

  select {
    height: 36px;
  }

  button {
    height: 36px;
    color: #f7f7f7;
    background: #232323;
    border: 2px solid transparent;

    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
      color: #232323;
      background: transparent;
      border: 2px solid #232323;
    }
  }
`;
