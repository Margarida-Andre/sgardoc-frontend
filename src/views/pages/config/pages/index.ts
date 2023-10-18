import Header from "../components/header";
import NavBar from "../components/navbar";
import Campos from "./campos";
import AddCampos from "./campos/add";
import EditCampos from "./campos/edit";
import Classes from "./classes";
import AddClasse from "./classes/add";
import EditClasses from "./classes/edit";
import Cursos from "./cursos";
import AddCurso from "./cursos/add";
import EditCurso from "./cursos/edit";
import Disciplinas from "./disciplinas";
import AddDisciplina from "./disciplinas/add";
import EditDisciplina from "./disciplinas/edit";
import HomeConfig from "./home";
import { Pagestype } from "./types";

const Pages: Pagestype = {
  home: HomeConfig,
  campos: Campos,
  disciplinas: Disciplinas,
  cursos: Cursos,
  classes: Classes,

  camposEdit: EditCampos,
  disciplinasEdit: EditDisciplina,
  cursosEdit: EditCurso,
  classesEdit: EditClasses,

  cursosAdd: AddCurso,
  camposAdd: AddCampos,
  disciplinasAdd: AddDisciplina,
  classesAdd: AddClasse,
};

export const Components = {
  Header,
  NavBar,
};

export default Pages;
