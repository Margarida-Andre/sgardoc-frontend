import styled, { AnyStyledComponent } from "styled-components";

export const Container: AnyStyledComponent = styled.div`
  width: 100%;
  height: 60px;
  background-color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 25px;

  h3 {
    display: flex;

    a {
      color: #232323;
      font-weight: 600;
      line-height: 2;
      font-size: 18px;
    }
  }

  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    box-shadow: 1px 1px 1px #cccccc;
  }
`;
