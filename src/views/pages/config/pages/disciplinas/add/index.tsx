import React, { useState } from "react";
// import { Container } from './styles';
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { FormTag } from "../../../shared/FormTag/styles";
import { AppState } from "../../../store";
import * as ConfigActions from "../../../store/configurations/actions";
import { Disciplina } from "../../../store/configurations/types";
import { Props } from "../../../types";

const AddDisciplina: React.FC<Props> = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  let Disciplina: Disciplina;

  const { ADD_DISCIPLINA } = props;

  const AddDisciplin = () => {
    Disciplina = {
      name,
      description,
    };

    ADD_DISCIPLINA(Disciplina);
  };

  return (
    <>
      <div>
        <h2> Adicionar Disciplina </h2>
      </div>
      <FormTag action="#">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="button" onClick={() => AddDisciplin()}>
          Adicionar Disciplina
        </button>
      </FormTag>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  configurations: state.configurations,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ConfigActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddDisciplina);
