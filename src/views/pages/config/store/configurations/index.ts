import { Reducer } from "redux";
import { ConfigState, Config_Actions } from "./types";

const INITIAL_STATE: ConfigState = {
  disciplinas: [],
  cursos: [],
  classes: [],
  inputs: [],
};

const reducer: Reducer<ConfigState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Config_Actions.ADD_CURSO:
      state.cursos.push(action.payload.curso);
      return state;

    case Config_Actions.REMOVE_CURSO:
      state.cursos = state.cursos.filter(
        (item, index) => index !== action.payload.idCurso
      );
      return state;

    case Config_Actions.EDIT_CURSO:
      state.cursos[action.payload.idCurso] = action.payload.curso;
      return state;

    case Config_Actions.ADD_CLASSE:
      state.classes.push(action.payload.classe);
      return state;

    case Config_Actions.REMOVE_CLASSE:
      state.classes = state.classes.filter(
        (item, index) => index !== action.payload.idClasse
      );
      return state;

    case Config_Actions.EDIT_CLASSE:
      state.classes[action.payload.idClasse] = action.payload.classe;
      return state;

    case Config_Actions.ADD_DISCIPLINA:
      state.disciplinas.push(action.payload.disciplina);
      return state;

    case Config_Actions.REMOVE_DISCIPLINA:
      state.disciplinas = state.disciplinas.filter(
        (item, index) => index !== action.payload.idDisciplina
      );
      return state;

    case Config_Actions.EDIT_DISCIPLINA:
      state.disciplinas[action.payload.idDisciplina] =
        action.payload.disciplina;
      return state;

    case Config_Actions.ADD_INPUT:
      state.inputs.push(action.payload.input);
      return state;

    case Config_Actions.REMOVE_INPUT:
      state.inputs = state.inputs.filter(
        (item, index) => index !== action.payload.idInput
      );
      return state;

    case Config_Actions.EDIT_INPUT:
      state.inputs[action.payload.idInput] = action.payload.input;
      return state;

    default:
      return state;
  }
};

export default reducer;
