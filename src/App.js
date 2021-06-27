import Container from 'components/Container';
import LoginPage from 'pages/LoginPage';
import './scss/_main.scss';
// import PrivateRoute from 'components/PrivateRoute';
// import PublicRoute from 'components/PublicRoute';

// import routes from 'routes';

const App = () => {
  return (
    <Container>
      <p>The best project</p>
      <LoginPage />
    </Container>
  );
};

export default App;
