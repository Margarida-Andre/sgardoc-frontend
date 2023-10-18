import styled, { AnyStyledComponent } from "styled-components";

export const Container: AnyStyledComponent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  padding: 5px 10px;

  h4 {
    width: 100%;
  }

  nav {
    display: flex;
    width: 100%;
    ul {
      list-style: none;
      width: 100%;

      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;

      li {
        display: flex;
        width: 100%;

        a {
          text-decoration: none;
        }
      }
    }
  }
`;
