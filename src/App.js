import { Switch, Redirect } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// import { useState } from 'react';
// import Modal from 'components/Modal';
import Container from 'components/Container';
// import LoginPage from 'pages/LoginPage';
// import RegisterPage from 'pages/RegisterPage';
import AppBar from 'components/AppBar';
// import mobilePlug from 'components/Modal/mobile_plug.png';
// import deskPlug from 'components/Modal/desk_plug.png';
import './scss/_main.scss';

import routes from 'routes';

// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';

// import routes from 'routes';
// import { getCurrentUser } from 'redux/auth/auth-operations';

// const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
// const ProjectsPage = lazy(() => import('./pages/ProsectsPage'));

const App = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getCurrentUser());
  // }, [dispatch]);  // Это на будущее

  // const [showModal, setShowModal] = useState(false);

  // const toggleModal = () => {
  //   setShowModal(!showModal);
  // };

  return (
    <>
      <AppBar />
      <Container>
        <Suspense fallback={<p>This is spinner, trust me</p>}>
          <Switch>
            {/* <PublicRoute
              path={routes.login}
              restricted
              component={LoginPage}
              redirectTo={routes.projects}
            /> */}
            <PublicRoute
              path={routes.signup}
              restricted
              component={RegisterPage}
              redirectTo={routes.projects}
            />
            {/* <PrivateRoute
              path={routes.projects}
              restricted
              component={ProjectsPage}
              redirectTo={routes.projects}
            /> */}
            <Redirect to={routes.home} />
          </Switch>

          {/* <button type="button" onClick={toggleModal}>
          Open modal
        </button>
        {showModal && (
          <Modal onCloseModal={toggleModal}>
            {window.innerWidth < 768 ? (
              <img src={mobilePlug} alt="mobile plug" />
            ) : (
              <img src={deskPlug} alt="mobile plug" />
            )}
          </Modal>
        )} */}
        </Suspense>
      </Container>
    </>
  );
};

export default App;
