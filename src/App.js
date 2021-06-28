import { useState } from 'react';
import Modal from 'components/Modal';
import Container from 'components/Container';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import AppBar from 'components/AppBar';
import mobilePlug from 'components/Modal/mobile_plug.png';
import deskPlug from 'components/Modal/desk_plug.png';
import './scss/_main.scss';
// import PrivateRoute from 'components/PrivateRoute';
// import PublicRoute from 'components/PublicRoute';

// import routes from 'routes';

const App = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Container>
      <AppBar />
      <LoginPage />
    
// feature/modal
      <button type="button" onClick={toggleModal}>
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
      )}

      <RegisterPage />

    </Container>
  );
};

export default App;
