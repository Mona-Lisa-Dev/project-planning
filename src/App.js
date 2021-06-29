import { Switch, Redirect } from 'react-router-dom';
import { lazy, Suspense } from 'react';
// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';

import Container from 'components/Container';
import AppBar from 'components/AppBar';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';

import routes from 'routes';

import './scss/_main.scss';

// import { getCurrentUser } from 'redux/auth/auth-operations';

const LoginPage = lazy(
  () => import('./pages/LoginPage') /* webpackChunkName: "LoginPage" */,
);
const RegisterPage = lazy(() =>
  import('./pages/RegisterPage' /* webpackChunkName: "RegisterPage" */),
);
const ProjectsPage = lazy(() =>
  import('./pages/ProjectsPage' /* webpackChunkName: "ProsectsPage" */),
);

const App = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getCurrentUser());
  // }, [dispatch]);  // Это на будущее

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
            <PublicRoute
              path={routes.projects}
              restricted
              component={ProjectsPage}
              redirectTo={routes.projects}
            />
            {/* Убрать потом блок над этим */}
            {/* <PrivateRoute
              path={routes.projects}
              restricted
              component={ProjectsPage}
              redirectTo={routes.projects}
            /> */}

            <Redirect to={routes.home} />
          </Switch>
        </Suspense>
      </Container>
    </>
  );
};

export default App;
