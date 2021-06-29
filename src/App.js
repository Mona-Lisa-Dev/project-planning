import Container from 'components/Container';
import LoginPage from 'pages/LoginPage';
import AppBar from 'components/AppBar';
import './scss/_main.scss';
// import PrivateRoute from 'components/PrivateRoute';
// import PublicRoute from 'components/PublicRoute';
import Diagram from 'components/Diagram';

// import routes from 'routes';

const App = () => {
  return (
    <Container>
      <AppBar />
      <LoginPage />
      <Diagram />
    </Container>
  );
};

export default App;
