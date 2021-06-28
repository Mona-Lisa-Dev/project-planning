import { useState } from 'react';
import Modal from 'components/Modal';
// import s from './SprintsPage.module.scss';
import s from 'components/Modal/Modal.module.scss';

const SprintsPage = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <button type="button" onClick={toggleModal}>
        Open modal
      </button>

      {showModal && (
        <Modal onCloseModal={toggleModal}>
          <div className={s.modalPlug}>
            <h2>Modal content</h2>
          </div>
        </Modal>
      )}
    </>
  );
};

export default SprintsPage;
