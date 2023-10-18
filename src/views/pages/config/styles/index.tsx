import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  form {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    min-height: 100vh;
    width: 500px;

    h2 {
      margin-bottom: 20px;
    }

    field {
      display: flex;
      align-items: baseline;
      justify-content: center;
    }

    > div.control {
      width: 100%;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      position: relative;
      transform: translateY(550%);
    }

    div.content {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      position: absolute;
      transform: translateY(50%);
    }

    button {
      background: #232323;
      color: #f7f7f7;
      padding: 5px 10px;
      border: none;
      width: 80px;
      border-radius: 4px;
      transition: all 0.4s;

      :disabled {
        background: #191919;
        opacity: 0.3;
        cursor: not-allowed;
      }
    }

    input {
      transform: scale(1.5);
      margin-right: 10px;
    }
  }
`;
