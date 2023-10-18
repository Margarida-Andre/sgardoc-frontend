import React from "react";
import { Provider } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { Components } from "../pages";
import store from "../store";
import { routes } from "../routes/routes";
import { Container } from "./styles";
import { RouteItem } from "../routes/types";

const LayoutConfig: React.FC = () => {
  return (
    <Provider store={store}>
      <Container>
        <div className="main-header"> {<Components.Header />} </div>
        <div className="main-aside"> {<Components.NavBar />} </div>
        <div className="main-body">
          <Switch>
            {routes.map((item: RouteItem) => (
              <Route key={item.name} {...item} />
            ))}
            <Redirect from="/" to="/config" />
          </Switch>
        </div>
      </Container>
    </Provider>
  );
};

export default LayoutConfig;
