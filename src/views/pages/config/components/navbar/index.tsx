import React from "react";
import { Link } from "react-router-dom";
import { Container } from "./styles";
import { NavItems } from "./data";
import { TypeItemNav } from "./types";

const NavBar: React.FC = () => {
  return (
    <Container>
      <h4> Configurações </h4>
      <nav>
        <ul>
          {NavItems.map((item: TypeItemNav, index: number) => (
            <li key={index}>
              <Link to={item.to}> {item.linkText} </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
};

export default NavBar;
