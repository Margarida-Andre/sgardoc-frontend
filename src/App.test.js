import React from "react";
import { shallow } from "enzyme/build";
import App from "./App";
import ChartLineSimple from "./views/charts/ChartLineSimple";
import Dashboard from "./views/dashboard/Dashboard.js";
import AddInscricao from "./views/inscricoes-exame-acesso/addInscricao/index";

test("testar componente App", () => {
  const wrapper = shallow(<App />);
  wrapper.unmount();
});

test("testar componente Dashboard", () => {
  const wrapper = shallow(<Dashboard />);
  wrapper.unmount();
});

test("testar componente Chart", () => {
  const wrapper = shallow(<ChartLineSimple />);
  wrapper.unmount();
});

test("testar componente Inscrição", () => {
  const wrapper = shallow(<AddInscricao />);
  wrapper.unmount();
});
