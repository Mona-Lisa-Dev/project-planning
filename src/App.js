// import PrivateRoute from 'components/PrivateRoute';
// import PublicRoute from 'components/PublicRoute';

// import routes from 'routes';
import './scss/_main.scss';

import LoginPage from 'pages/LoginPage';
import AppBar from 'components/AppBar';

const App = () => {
  return (
    <>
      <AppBar />
      <p>The best project</p>
      <LoginPage />
    </>
  );
};

export default App;
