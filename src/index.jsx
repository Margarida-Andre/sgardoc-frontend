import "core-js";
import React from "react";
import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { icons } from "./assets/icons";
import "./polyfill";
import store from "./store";

React.icons = icons;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
