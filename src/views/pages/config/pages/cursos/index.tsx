import React, { useState } from "react";
// import { Container } from './styles';
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { ContainerHeaderItemConfig } from "../../shared/HeaderItemConfig/styles";
import LinkAdd from "../../shared/LinkAdd";
import ListItems from "../../shared/ListItems";
import { AppState } from "../../store";
import * as ConfigActions from "../../store/configurations/actions";
import { Props } from "../../types";

const Cursos: React.FC<Props> = (props) => {
  const [cursos, setCursos] = useState(props.configurations.cursos);

  const { REMOVE_CURSO } = props;

  const DeleteCurso = (index: number) => {
    REMOVE_CURSO(index);
    setCursos(props.configurations.cursos);
  };

  const EditCurso = (index: number) => {
    console.log("Editar Curso na position => ", index);
  };
  return (
    <>
      <ContainerHeaderItemConfig>
        <h2>Cursos</h2>
        <LinkAdd linkText="Cursos" linkTo="/config/cursos/add" />
      </ContainerHeaderItemConfig>

      <ListItems
        items={cursos}
        handleDelete={DeleteCurso}
        handleEdit={EditCurso}
      />
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  configurations: state.configurations,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ConfigActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cursos);
