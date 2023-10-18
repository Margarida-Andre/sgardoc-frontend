export interface Disciplina {
  name: string;
  description: string;
}

export interface Curso {
  name: string;
  description: string;
  duration: string;
}

export interface Classe {
  name: string;
  description: string;
  escolaridade: string;
}

export interface Turma {}

export interface Input {
  name: string;
  type: string;
  font: string;
  placeholder: string;
  color: string;
  form: string;
}

export interface ConfigState {
  disciplinas: Disciplina[];
  cursos: Curso[];
  inputs: Input[];
  classes: Classe[];
}

export enum Config_Actions {
  ADD_CURSO = "@cursos/ADD",
  REMOVE_CURSO = "@cursos/REMOVE",
  EDIT_CURSO = "@cursos/EDIT",

  ADD_DISCIPLINA = "@disciplinas/ADD",
  REMOVE_DISCIPLINA = "@disciplinas/REMOVE",
  EDIT_DISCIPLINA = "@disciplinas/EDIT",

  ADD_CLASSE = "@classes/ADD",
  REMOVE_CLASSE = "@classes/REMOVE",
  EDIT_CLASSE = "@classes/EDIT",

  ADD_INPUT = "@inputs/ADD",
  REMOVE_INPUT = "@inputs/REMOVE",
  EDIT_INPUT = "@inputs/EDIT",
}

export interface Payload {
  name: string;
  description: string;
  duration?: string;
  escolaridade?: string;
  type?: string;
  font?: string;
  placeholder?: string;
  color?: string;
  form?: string;
}
