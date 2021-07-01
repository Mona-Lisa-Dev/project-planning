import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'components/Modal';
import CreateProject from 'components/CreateProject';
import ProjectList from 'components/ProjectList';
import projectsOperations from 'redux/projects/projects-operations';

import { getLoadingProjects } from 'redux/projects/projects-selectors';

import styles from './ProjectsPage.module.scss';
import Spinner from 'components/Loader/Loader';

const ProjectsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const loading = useSelector(getLoadingProjects);

  const dispatch = useDispatch();
  useEffect(() => dispatch(projectsOperations.getAllProjects()), [dispatch]);

  const openModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(!showModal);

  return (
    <>
      <div className={styles.ProjectsHeaderBar}>
        <h1 className={styles.ProjectsTitle}>Projects</h1>

        {loading && <Spinner />}

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
      <ProjectList />
    </>
  );
};

export default ProjectsPage;
