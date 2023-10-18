import React, { useState } from "react";
// import { Container } from './styles';
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { FormTag } from "../../../shared/FormTag/styles";
import { AppState } from "../../../store";
import * as ConfigActions from "../../../store/configurations/actions";
import { Curso } from "../../../store/configurations/types";
import { Props } from "../../../types";

const AddCurso: React.FC<Props> = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  let Curso: Curso;

  const { ADD_CURSO } = props;

  const AddCourse = () => {
    Curso = {
      name,
      description,
      duration,
    };

    ADD_CURSO(Curso);
  };

  return (
    <>
      <div>
        <h2> Adicionar Curso</h2>
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
        <input
          type="text"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <button type="button" onClick={() => AddCourse()}>
          Adicionar Curso
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

export default connect(mapStateToProps, mapDispatchToProps)(AddCurso);
