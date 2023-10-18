import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Administração",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Menu"],
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Usuários",
    route: "/gAdmin",
    icon: "cil-people",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Estudantes",
        to: "/students/list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Professores",
        to: "/teacher/list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Secretários",
        to: "/students/list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "DEI",
        to: "/dei/list",
      },
    ],
  },

  {
    _tag: "CSidebarNavItem",
    name: "Cursos",
    to: "/profile/list",
    icon: "cil-star",
  },

  {
    _tag: "CSidebarNavItem",
    name: "Turmas",
    to: "/profile/list",
    icon: "cil-puzzle",
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Inscrições",
    route: "/gAdmin",
    icon: "cil-notes",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Pendentes",
        to: "/menuItem/list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Rejeitadas",
        to: "/menuItem/list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Aprovadas",
        to: "/inscricoes/aprovadas",
      },
    ],
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Matrículas",
    route: "",
    icon: "cil-layers",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Pendentes",
        to: "/menuItem/list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Rejeitadas",
        to: "/menuItem/list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Aprovadas",
        to: "/matriculas/aprovadas",
      },
    ],
  },

  {
    _tag: "CSidebarNavTitle",
    _children: ["Requisição de Documentos"],
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Histórico com Notas",
    route: "",
    icon: "cil-file",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Pendentes",
        to: "/menuItem/list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Rejeitadas",
        to: "/menuItem/list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Aprovadas",
        to: "/menuItem/list",
      },
    ],
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Declaração de Estudos",
    route: "",
    icon: "cil-file",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Pendentes",
        to: "/menuItem/list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Rejeitadas",
        to: "/menuItem/list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Aprovadas",
        to: "/menuItem/list",
      },
    ],
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Histórico com Notas",
    route: "",
    icon: "cil-file",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Pendentes",
        to: "/menuItem/list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Rejeitadas",
        to: "/menuItem/list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Aprovadas",
        to: "/menuItem/list",
      },
    ],
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Requerimentos",
    route: "",
    icon: "cil-file",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Pendentes",
        to: "/menuItem/list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Rejeitadas",
        to: "/menuItem/list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Aprovadas",
        to: "/menuItem/list",
      },
    ],
  },

  {
    _tag: "CSidebarNavTitle",
    _children: ["Autenticação"],
  },

  {
    _tag: "CSidebarNavItem",
    name: "Perfil",
    to: "/profile/list",
    icon: "cil-user",
  },

  {
    _tag: "CSidebarNavItem",
    name: "Configurações",
    to: "/relatorios",
    icon: "cil-settings",
  },
];

export default _nav;
