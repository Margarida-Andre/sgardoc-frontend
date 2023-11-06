import Charts from "./views/charts/Charts";
import Dashboard from "./views/dashboard/Dashboard";
import {
  ListInscricao,
  AddInscricao,
  EditInscricao,
} from "./views/inscricoes-exame-acesso";
import { AddMatricula, ListMatricula, EditMatricula } from "./views/matricula";
import { AddEstudante, ListEstudante, EditEstudante } from "./views/estudante";
import {
  ListTurma,
  AddTurma,
  EditTurma,
  ListEstudantesByTurma,
} from "./views/turma";
import {
  AddPautaParcelar,
  EditPautaParcelar,
  ListPautaParcelar,
} from "./views/pauta-parcelar";
import {
  ListUsers,
  AddUsers,
  EditUsers,
  MoreDetailsUsers,
} from "./views/users";
import { ListMenuItem, AddMenuItem, EditMenuItem } from "./views/menuItems";
import { ListArquivo, AddArquivo, EditArquivo } from "./views/arquivos";
import Estatisticas from "./views/estatisticas";
import { ListProfile, EditProfile } from "./views/profile/index";
import ListProfilePhotos from "./views/profile/listProfile/listProfilePhotos";
import ListProfileGeneral from "./views/profile/listProfile/listProfileGeneral";
import Login from "./views/pages/login/Login";

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/login", name: "Login", component: Login },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/charts", name: "Charts", component: Charts },

  //Inscricoes
  {
    path: "/inscricoes/aprovadas",
    name: "Inscrições de Exame de Acesso",
    component: ListInscricao,
  },
  {
    path: "/inscricao/add",
    name: "Inscricao de Exame de Acesso",
    component: AddInscricao,
  },
  {
    path: "/inscricao/edit",
    name: "Inscricao de Exame de Acesso",
    component: EditInscricao,
  },

  //Matrículas
  {
    path: "/matriculas/aprovadas",
    name: "Matriculas",
    component: ListMatricula,
  },
  {
    path: "/matricula/add",
    name: "Matrícula",
    component: AddMatricula,
  },
  {
    path: "/matricula/edit",
    name: "Matricula",
    component: EditMatricula,
  },

  //Estudantes
  {
    path: "/estudantes/list",
    name: "Estudante",
    component: ListEstudante,
  },
  {
    path: "/estudante/add",
    name: "Estudante",
    component: AddEstudante,
  },
  {
    path: "/estudante/edit",
    name: "Estudante",
    component: EditEstudante,
  },

  //Turmas
  {
    path: "/turmas/list",
    name: "Turma",
    component: ListTurma,
  },
  {
    path: "/turma/add",
    name: "Turma",
    component: AddTurma,
  },
  {
    path: "/turma/edit",
    name: "Turma",
    component: EditTurma,
  },
  {
    path: "/turma/estudantes/list",
    name: "Turma",
    component: ListEstudantesByTurma,
  },

  //User
  { path: "/users/list", name: "Users", component: ListUsers },
  { path: "/users/add", name: "Users", component: AddUsers },
  { path: "/users/edit", name: "Users", component: EditUsers },
  { path: "/users/details", name: "Users", component: MoreDetailsUsers },

  //Menu
  { path: "/menuItem/list", name: "menuItem", component: ListMenuItem },
  { path: "/menuItem/add", name: "menuItem", component: AddMenuItem },
  { path: "/menuItem/edit", name: "menuItem", component: EditMenuItem },

  //Arquivo
  { path: "/arquivo/list", name: "arquivo", component: ListArquivo },
  { path: "/arquivo/add", name: "arquivo", component: AddArquivo },
  { path: "/arquivo/edit/:id", name: "arquivo", component: EditArquivo },

  { path: "/estatisticas", name: "Estatisticas", component: Estatisticas },

  //Stock
  { path: "/profile/list", name: "Profile", component: ListProfile },
  { path: "/profile/edit", name: "Profile", component: EditProfile },
  {
    path: "/profile/listProfilePhotos",
    name: "Profile",
    component: ListProfilePhotos,
  },
  {
    path: "/profile/listProfileGeneral",
    name: "Profile",
    component: ListProfileGeneral,
  },

  //PautaParcelar
  {
    path: "/pautaParcelar/add",
    name: "PautaParcelar",
    component: AddPautaParcelar,
  },
  {
    path: "/pautaParcelar/edit",
    name: "PautaParcelar",
    component: EditPautaParcelar,
  },
  {
    path: "/pautaParcelar/list",
    name: "PautaParcelar",
    component: ListPautaParcelar,
  },
];

export default routes;
