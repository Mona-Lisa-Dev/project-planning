import { useState } from 'react';

import Modal from 'components/Modal';
import CreateProject from 'components/CreateProject';

import styles from './ProjectsPage.module.scss';

const ProjectsPage = () => {
  const [showModal, setShowModal] = useState(false);
  //   const [projects, setProjects] = useState(''); // Заготовка на будушее

  const openModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div className={styles.ProjectsHeaderBar}>
        <h1 className={styles.ProjectsTitle}>Projects</h1>

        <label htmlFor="CreateButton" className={styles.ProjectsUtilDiv}>
          <button
            className={styles.ProjectsCreateButton}
            type="button"
            name="Create"
            id="CreateButton"
            onClick={openModal}
          ></button>
          Create a project
        </label>

        {showModal && (
          <Modal onCloseModal={handleCloseModal}>
            <CreateProject onClickCancel={handleCloseModal} />
          </Modal>
        )}
      </div>
      <ul className={styles.ProjectsList}>
        <li className={styles.ProjectsListItem}>1</li>
        <li className={styles.ProjectsListItem}>2</li>
        <li className={styles.ProjectsListItem}>3</li>
        <li className={styles.ProjectsListItem}>4</li>
      </ul>
    </>
  );
};

export default ProjectsPage;
