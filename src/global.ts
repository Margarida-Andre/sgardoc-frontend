import { CSSProperties } from "react";
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  
 
  body {
   
    &::-webkit-scrollbar{
        width: 0.4rem;
        background: linear-gradient(63.01deg, #fff 29.81%, #fff 100%);
    }
    &::-webkit-scrollbar-thumb{
        background: linear-gradient(63.01deg, #A9A9A9 29.81%, #A9A9A9 100%);
        border-radius: 1rem;
    }
  }
 
`;

export const override: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  borderColor: "#39f",
};
