import React from "react";
import { Link } from "react-router-dom";
import { Props } from "./types";
import { Container } from "./styles";

const LinkAdd: React.FC<Props> = (props) => {
  return (
    <Container>
      <Link to={`${props.linkTo}`}> Adicionar {props.linkText} </Link>
    </Container>
  );
};

export default LinkAdd;
