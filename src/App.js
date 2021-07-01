import { Route, Switch, Redirect } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Container from 'components/Container';
import AppBar from 'components/AppBar';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import authOperations from 'redux/auth/auth-operations';
import { getIsAuthenticated, getIsSignup } from 'redux/auth/auth-selectors';

import routes from 'routes';
import './scss/_main.scss';

// import Diagram from 'components/Diagram';
const LoginPage = lazy(
  () => import('./pages/LoginPage') /* webpackChunkName: "LoginPage" */,
);
const RegisterPage = lazy(() =>
  import('./pages/RegisterPage' /* webpackChunkName: "RegisterPage" */),
);
const ProjectsPage = lazy(() =>
  import('./pages/ProjectsPage' /* webpackChunkName: "ProjectsPage" */),
);
const SprintsPage = lazy(() =>
  import('./pages/SprintsPage' /* webpackChunkName: "SprintsPage" */),
);

const App = () => {
  const isAuthorized = useSelector(getIsAuthenticated);
  const isSignup = useSelector(getIsSignup);

  const dispatch = useDispatch();
  useEffect(() => dispatch(authOperations.getCurrentUser()), [dispatch]);

  return (
    <>
      <AppBar />

      <Container>
        <Suspense fallback={<p>This is spinner, trust me</p>}>
          <Switch>
            <PublicRoute
              path={routes.login}
              restricted
              component={LoginPage}
              redirectTo={routes.projects}
            />
            <Route
              path={routes.signup}
              restricted
              render={props =>
                isAuthorized ? (
                  routes.projects
                ) : isSignup ? (
                  <Redirect to={routes.login} />
                ) : (
                  <RegisterPage />
                )
              }
            />

            {/* <PrivateRoute
              path={routes.sprints}
              restricted
              component={SprintsPage}
              redirectTo={routes.login}
            /> */}

            <Route
              path={routes.sprints}
              restricted
              render={props =>
                isAuthorized ? (
                  <SprintsPage {...props} />
                ) : (
                  <Redirect to={routes.login} />
                )
              }
              // component={SprintsPage}
              // redirectTo={routes.login}
            />

            <PrivateRoute
              path={routes.projects}
              restricted
              component={ProjectsPage}
              redirectTo={routes.login}
            />
            {/* <PublicRoute
              path={routes.home}
              restricted
              component={isAuthorized ? ProjectsPage : RegisterPage}
              redirectTo={routes.projects}
            /> */}
            <Route
              path={routes.home}
              restricted
              render={props =>
                isAuthorized ? (
                  <Redirect to={routes.projects} />
                ) : (
                  <Redirect to={routes.signup} />
                )
              }
            />

            <Redirect to={routes.home} />
          </Switch>
        </Suspense>
      </Container>
    </>
  );
};

export default App;
