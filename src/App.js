import { useState } from 'react';
import Modal from 'components/Modal';
import Container from 'components/Container';
import LoginPage from 'pages/LoginPage';
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
      <button type="button" onClick={toggleModal}>
        Open modal
      </button>
      {showModal && (
        <Modal onCloseModal={toggleModal}>
          <h2>Modal Content</h2>
          <button type="button" onClick={toggleModal}>
            Close modal
          </button>
        </Modal>
      )}
      <p>The best project</p>
      <LoginPage />
    </Container>
  );
};

export default App;
