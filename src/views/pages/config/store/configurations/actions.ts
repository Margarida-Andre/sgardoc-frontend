import { action } from "typesafe-actions";
import { Classe, Config_Actions, Curso, Disciplina, Input } from "./types";

export const ADD_CURSO = (curso: Curso) =>
  action(Config_Actions.ADD_CURSO, { curso });

export const REMOVE_CURSO = (idCurso: number) =>
  action(Config_Actions.REMOVE_CURSO, { idCurso });

export const EDIT_CURSO = (idCurso: number, curso: Curso) =>
  action(Config_Actions.EDIT_CURSO, { idCurso, curso });

export const ADD_CLASSE = (classe: Classe) =>
  action(Config_Actions.ADD_CLASSE, { classe });

export const REMOVE_CLASSE = (idClasse: number) =>
  action(Config_Actions.REMOVE_CLASSE, { idClasse });

export const EDIT_CLASSE = (idClasse: number, classe: Classe) =>
  action(Config_Actions.EDIT_CLASSE, { idClasse, classe });

export const ADD_DISCIPLINA = (disciplina: Disciplina) =>
  action(Config_Actions.ADD_DISCIPLINA, { disciplina });

export const REMOVE_DISCIPLINA = (idDisciplina: number) =>
  action(Config_Actions.REMOVE_DISCIPLINA, { idDisciplina });

export const EDIT_DISCIPLINA = (idDisciplina: number, disciplina: Disciplina) =>
  action(Config_Actions.EDIT_DISCIPLINA, { idDisciplina, disciplina });

export const ADD_INPUT = (input: Input) =>
  action(Config_Actions.ADD_INPUT, { input });

export const REMOVE_INPUT = (idInput: number) =>
  action(Config_Actions.REMOVE_INPUT, { idInput });

export const EDIT_INPUT = (idInput: number, input: Input) =>
  action(Config_Actions.EDIT_INPUT, { idInput, input });
