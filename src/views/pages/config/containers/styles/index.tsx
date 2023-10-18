import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 250px 3fr;
  grid-template-rows: 60px 3fr;
  grid-template-areas: "header header header" "aside main main" "aside main main";
  grid-gap: 10px;
  width: 100%;
  min-height: 100vh;

  div.main-header {
    grid-area: header;
    display: flex;
  }

  div.main-aside {
    grid-area: aside;
    display: flex;
  }

  div.main-body {
    grid-area: main;
  }
`;
