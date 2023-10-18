import Pages from "../pages";
import { RouteItem } from "./types";

export const routes: RouteItem[] = [
  {
    exact: true,
    path: "/config",
    component: Pages.home,
    name: "Home",
  },
  {
    exact: true,
    path: "/config/cursos",
    component: Pages.cursos,
    name: "Cursos",
  },
  {
    exact: true,
    path: "/config/cursos/edit:id",
    component: Pages.cursosEdit,
    name: "Cursos | Editar",
  },
  {
    exact: true,
    path: "/config/cursos/add",
    component: Pages.cursosAdd,
    name: "Cursos | Adicionar",
  },
  {
    exact: true,
    path: "/config/campos",
    component: Pages.campos,
    name: "Campos",
  },
  {
    exact: true,
    path: "/config/campos/edit/:id",
    component: Pages.camposEdit,
    name: "Campos | Editar",
  },
  {
    exact: true,
    path: "/config/campos/add",
    component: Pages.camposAdd,
    name: "Campos | Adicionar",
  },
  {
    exact: true,
    path: "/config/disciplinas",
    component: Pages.disciplinas,
    name: "Disciplinas",
  },
  {
    exact: true,
    path: "/config/disciplinas/edit/:id",
    component: Pages.disciplinasEdit,
    name: "Disciplinas | Editar",
  },
  {
    exact: true,
    path: "/config/disciplinas/add",
    component: Pages.disciplinasAdd,
    name: "Disciplinas | Adicionar",
  },
  {
    exact: true,
    path: "/config/classes",
    component: Pages.classes,
    name: "Classes",
  },
  {
    exact: true,
    path: "/config/classes/edit/:id",
    component: Pages.classesEdit,
    name: "Classes | Editar",
  },
  {
    exact: true,
    path: "/config/classes/add",
    component: Pages.classesAdd,
    name: "Classes | Adicionar",
  },
];
