import React from "react";
import { Container } from "./styles";

const Header = () => {
  return (
    <Container>
      <h3>
        <a href="http://localhost:3000"> Portal das Escolas </a>
      </h3>
      <img src="/avatars/8.jpg" alt="AvatarImage" />
    </Container>
  );
};

export default Header;
