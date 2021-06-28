import Container from 'components/Container';
import LoginPage from 'pages/LoginPage';
import AppBar from 'components/AppBar';
import './scss/_main.scss';
// import PrivateRoute from 'components/PrivateRoute';
// import PublicRoute from 'components/PublicRoute';
import SprintPage from 'pages/SprintPage/SprintPage';
// import routes from 'routes';

const App = () => {
  return (
    <Container>
      <AppBar />
      <LoginPage />
      <SprintPage title="title Sprint page" />
    </Container>
  );
};

export default App;
