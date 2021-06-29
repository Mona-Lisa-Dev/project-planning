import { Switch, Redirect } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Container from 'components/Container';
import AppBar from 'components/AppBar';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import authOperations from 'redux/auth/auth-operations';
import { getIsAuthenticated } from 'redux/auth/auth-selectors';

import routes from 'routes';
import './scss/_main.scss';

const LoginPage = lazy(
  () => import('./pages/LoginPage') /* webpackChunkName: "LoginPage" */,
);
const RegisterPage = lazy(() =>
  import('./pages/RegisterPage' /* webpackChunkName: "RegisterPage" */),
);
const ProjectsPage = lazy(() =>
  import('./pages/ProjectsPage' /* webpackChunkName: "ProjectsPage" */),
);

const App = () => {
  const isAuthorized = useSelector(getIsAuthenticated);
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
            <PublicRoute
              path={routes.signup}
              restricted
              component={RegisterPage}
              redirectTo={routes.projects}
            />
            <PrivateRoute
              path={routes.projects}
              restricted
              component={ProjectsPage}
              redirectTo={routes.projects}
            />
            <PublicRoute
              path={routes.home}
              restricted
              component={isAuthorized ? ProjectsPage : RegisterPage}
              redirectTo={routes.projects}
            />
            <Redirect to={routes.home} />
          </Switch>
        </Suspense>
      </Container>
    </>
  );
};

export default App;
