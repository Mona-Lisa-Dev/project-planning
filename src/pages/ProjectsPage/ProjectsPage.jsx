// import { useState } from 'react';

import styles from './ProjectsPage.module.scss';

const ProjectsPage = () => {
  //   const [projects, setProjects] = useState(''); // Заготовка на будушее

  const createProject = () => {
    console.log('Project Created!');
  };

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
            onClick={createProject}
          ></button>
          Create a project
        </label>
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
