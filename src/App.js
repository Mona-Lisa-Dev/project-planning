import Container from 'components/Container';
import LoginPage from 'pages/LoginPage';
import './scss/_main.scss';
// import PrivateRoute from 'components/PrivateRoute';
// import PublicRoute from 'components/PublicRoute';

// import routes from 'routes';


// import LoginPage from 'pages/LoginPage';

// import AddPeopleForm from 'components/AddPeopleForm';

const App = () => {
  // return <p>The best project</p>;

  return (
    <div>
      {/* <AddPeopleForm /> */}

      {/* <LoginPage /> */}
    </div>

    <Container>
      <p>The best project</p>
      <LoginPage />
    </Container>

  );
};

export default App;
