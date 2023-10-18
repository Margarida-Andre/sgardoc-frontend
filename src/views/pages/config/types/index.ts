import {
  Classe,
  Curso,
  Input,
  Disciplina,
  Config_Actions,
  ConfigState,
} from "../store/configurations/types";

export interface DispatchProps {
  ADD_CLASSE: (classe: Classe) => {
    type: Config_Actions.ADD_CLASSE;
    payload: { classe: Classe };
  };
  REMOVE_CLASSE: (idClasse: number) => {
    type: Config_Actions.REMOVE_CLASSE;
    payload: { idClasse: number };
  };
  EDIT_CLASSE: (
    idClasse: number,
    classe: Classe
  ) => {
    type: Config_Actions.EDIT_CLASSE;
    payload: { idClasse: number; classe: Classe };
  };
  ADD_CURSO: (curso: Curso) => {
    type: Config_Actions.ADD_CURSO;
    payload: { curso: Curso };
  };
  REMOVE_CURSO: (idCurso: number) => {
    type: Config_Actions.REMOVE_CURSO;
    payload: { idCurso: number };
  };
  EDIT_CURSO: (
    idCurso: number,
    curso: Curso
  ) => {
    type: Config_Actions.EDIT_CURSO;
    payload: { idCurso: number; curso: Curso };
  };
  ADD_DISCIPLINA: (disciplina: Disciplina) => {
    type: Config_Actions.ADD_DISCIPLINA;
    payload: { disciplina: Disciplina };
  };
  REMOVE_DISCIPLINA: (idDisciplina: number) => {
    type: Config_Actions.REMOVE_DISCIPLINA;
    payload: { idDisciplina: number };
  };
  EDIT_DISCIPLINA: (
    idDisciplina: number,
    disciplina: Disciplina
  ) => {
    type: Config_Actions.EDIT_DISCIPLINA;
    payload: { idDisciplina: number; disciplina: Disciplina };
  };
  ADD_INPUT: (input: Input) => {
    type: Config_Actions.ADD_INPUT;
    payload: { input: Input };
  };
  REMOVE_INPUT: (idInput: number) => {
    type: Config_Actions.REMOVE_INPUT;
    payload: { idInput: number };
  };
  EDIT_INPUT: (
    idInput: number,
    input: Input
  ) => {
    type: Config_Actions.EDIT_INPUT;
    payload: { idInput: Number; input: Input };
  };
}

interface ConfigProps {
  configurations: ConfigState;
}

export type Props = ConfigProps & DispatchProps;
