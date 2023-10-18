import React, { Component } from "react";
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
  RouteProps,
} from "react-router-dom";
import ConfigRoutes from "./views/pages/config/routes";
import GlobalStyles from "./global";
import { InscricaoProvider } from "./hooks/useInscricao";
import { ProvinciaProvider } from "./hooks/useProvincia";
import { MunicipioProvider } from "./hooks/useMunicipio";
import { EstadoCivilProvider } from "./hooks/useEstadoCivil";
import { GeneroProvider } from "./hooks/useGenero";
import { CursoProvider } from "./hooks/useCurso";
import { MatriculaProvider } from "./hooks/useMatricula";
import { IsAuthenticated } from "./services/auth";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./google-fonts.css";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages

const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));

const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

interface PrivateRouteProps extends RouteProps {
  component: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        IsAuthenticated() ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

class App extends Component {
  render() {
    return (
      <>
        <GlobalStyles />
        <MatriculaProvider>
        <CursoProvider>
          <GeneroProvider>
            <EstadoCivilProvider>
              <MunicipioProvider>
                <ProvinciaProvider>
                  <InscricaoProvider>
                    <HashRouter>
                      <React.Suspense fallback={loading}>
                        <Switch>
                          <PrivateRoute
                            path="/config"
                            component={ConfigRoutes}
                          />
                          <Route exact path="/login" component={Login} />
                          <Route exact path="/register" component={Register} />
                          <Route exact path="/404" component={Page404} />
                          <Route exact path="/500" component={Page500} />
                          <PrivateRoute path="/" component={TheLayout} />
                        </Switch>
                      </React.Suspense>
                    </HashRouter>
                  </InscricaoProvider>
                </ProvinciaProvider>
              </MunicipioProvider>
            </EstadoCivilProvider>
          </GeneroProvider>
        </CursoProvider>
        </MatriculaProvider>
      </>
    );
  }
}

export default App;
