import Container from 'components/Container';
import LoginPage from 'pages/LoginPage';
import AppBar from 'components/AppBar';
import './scss/_main.scss';
// import PrivateRoute from 'components/PrivateRoute';
// import PublicRoute from 'components/PublicRoute';

// import routes from 'routes';

const App = () => {
   return (
    <Container>
      <AppBar />

      <p>The best project</p>
      <LoginPage />
    </Container>
  );
};

export default App;
