import React, { useState } from "react";
// import { Container } from './styles';
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { FormTag } from "../../../shared/FormTag/styles";
import { AppState } from "../../../store";
import * as ConfigActions from "../../../store/configurations/actions";
import { Classe } from "../../../store/configurations/types";
import { Props } from "../../../types";

const AddClasse: React.FC<Props> = (props) => {
  const [name, setName] = useState("");
  const [description, setDecription] = useState("");
  const [escolaridade, setEscolaridade] = useState("");

  const { ADD_CLASSE } = props;

  const AddClass = () => {
    Classe = {
      name,
      description,
      escolaridade,
    };

    ADD_CLASSE(Classe);
  };

  let Classe: Classe;
  return (
    <>
      <div>
        <h2>Adicionar Classe</h2>
      </div>
      <FormTag>
        <input
          type="text"
          placeholder="Name"
          id="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          id="Description"
          value={description}
          onChange={(e) => setDecription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Escolaridade"
          id="Escolaridade"
          value={escolaridade}
          onChange={(e) => setEscolaridade(e.target.value)}
        />

        <button type="button" onClick={() => AddClass()}>
          Adicionar Classe
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

export default connect(mapStateToProps, mapDispatchToProps)(AddClasse);
