import styled from "styled-components";

export const Container = styled.div`
  width: 200px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    width: 200px;
    height: 36px;
    font-size: 16px;
    color: #f7f7f7;
    border-radius: 5px;
    text-decoration: none;
    background-color: #232323;
    border: 2px solid transparent;
    transition: all 0.4s;

    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
      color: #232323;
      border: 2px solid #232323;
      background-color: transparent;
    }
  }
`;
