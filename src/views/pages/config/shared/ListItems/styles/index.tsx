import styled from "styled-components";

export const ListItemsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  list-style: none;

  > li {
    width: 60%;
    margin: 5px 0;
    padding: 15px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      height: 30px;
      font-size: 16px;
      line-height: 2;
      font-weight: 600;
      margin-right: 20px;
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        border: 2px solid transparent;
        background: transparent;
        width: 100px;
        height: 30px;
        color: #ffffff;
        border-radius: 4px;
        margin: 1px 5px;
      }

      button#editItem {
        background: #008526;
      }

      button#deleteItem {
        background: #850000;
      }
    }
  }
`;
