// import PrivateRoute from 'components/PrivateRoute';
// import PublicRoute from 'components/PublicRoute';

// import routes from 'routes';
import './scss/_main.scss';

// import LoginPage from 'pages/LoginPage';

import AddPeopleForm from 'components/AddPeopleForm';

const App = () => {
  // return <p>The best project</p>;
  return (
    <div>
      <AddPeopleForm />

      {/* <LoginPage /> */}
    </div>
  );
};

export default App;
