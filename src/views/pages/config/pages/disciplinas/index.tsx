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

const Disciplinas: React.FC<Props> = (props) => {
  const [disciplinas, setDisciplinas] = useState(
    props.configurations.disciplinas
  );
  const { REMOVE_DISCIPLINA } = props;

  const DeleteDisciplina = (index: number) => {
    REMOVE_DISCIPLINA(index);
    setDisciplinas(props.configurations.disciplinas);
  };

  const EditDIsciplina = (index: number) => {
    console.log("Edit Disciplina Na position => ", index);
  };

  return (
    <>
      <ContainerHeaderItemConfig>
        <h2>Disciplinas</h2>
        <LinkAdd linkText="Disciplinas" linkTo="/config/disciplinas/add" />
      </ContainerHeaderItemConfig>

      <ListItems
        items={disciplinas}
        handleDelete={DeleteDisciplina}
        handleEdit={EditDIsciplina}
      />
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  configurations: state.configurations,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ConfigActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Disciplinas);
