import { useSelector } from 'react-redux';

import { getProjects } from 'redux/projects/projects-selectors';
import ProjectItem from '../ProjectItem';
import styles from './ProjectList.module.scss';

const ProjectList = () => {
  const projects = useSelector(getProjects);

  return (
    <ul className={styles.listWrapper}>
      {projects.map(project => (
        <li key={project.id} className={styles.listItem}>
          <ProjectItem project={project}></ProjectItem>
        </li>
      ))}
    </ul>
  );
};

export default ProjectList;
