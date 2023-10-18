import Charts from "./views/charts/Charts";
import Dashboard from "./views/dashboard/Dashboard";
import {
  ListInscricao,
  AddInscricao,
  EditInscricao,
} from "./views/inscricoes-exame-acesso";
import { AddMatricula, ListMatricula } from "./views/matricula";

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
];

export default routes;
