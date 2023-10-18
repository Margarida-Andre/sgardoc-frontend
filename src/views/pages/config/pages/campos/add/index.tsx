import React, { useState } from "react";
// import { Container } from './styles';
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { FormTag } from "../../../shared/FormTag/styles";
import { AppState } from "../../../store";
import * as ConfigActions from "../../../store/configurations/actions";
import { Input } from "../../../store/configurations/types";
import { Props } from "../../../types";

const AddCampos: React.FC<Props> = (props) => {
  let Input: Input;
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [font, setFont] = useState("");
  const [color, setColor] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [form, setForm] = useState("");

  const { ADD_INPUT } = props;

  const AddInput = () => {
    Input = {
      name,
      color,
      type,
      font,
      placeholder,
      form,
    };
    ADD_INPUT(Input);
  };

  return (
    <div>
      <h2> Adicionar Campo </h2>
      <FormTag action="#">
        <input
          type="text"
          placeholder="Name"
          id="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="type"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Font"
          id="Font"
          value={font}
          onChange={(e) => setFont(e.target.value)}
        />
        <input
          type="text"
          placeholder="Color"
          id="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Placeholder"
          id="Placeholder"
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
        />
        <select name="form" id="form" onChange={(e) => setForm(e.target.value)}>
          <option value="null">Selecione o Formulário</option>
          <option value="Cadastramento"> Cadastramento </option>
          <option value="Propinas"> Propinas </option>
          <option value="Login"> Login </option>
          <option value="Matriculas"> Matriculas </option>
          <option value="Incrições"> Inscrições </option>
        </select>
        <button type="button" onClick={() => AddInput()} id="btnSend">
          Adicionar Campo
        </button>
      </FormTag>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  configurations: state.configurations,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ConfigActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddCampos);
