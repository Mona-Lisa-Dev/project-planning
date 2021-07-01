import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getProjects } from 'redux/projects/projects-selectors';
import ProjectItem from '../ProjectItem';
import styles from './ProjectList.module.scss';

const ProjectList = () => {
  const projects = useSelector(getProjects);

  return (
    <ul className={styles.listWrapper}>
      {projects.map(project => (
        <li key={project.id} className={styles.listItem}>
          <Link
            to={{
              pathname: `/projects/${project.id}`,
            }}
          >
            <ProjectItem project={project}></ProjectItem>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ProjectList;
