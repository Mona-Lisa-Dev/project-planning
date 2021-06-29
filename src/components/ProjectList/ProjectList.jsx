import ProjectItem from '../ProjectItem';
import PropTypes from 'prop-types';
import styles from './ProjectList.module.scss';

const ProjectList = ({ projects }) => {
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

ProjectList.propTypes = {
  sprints: PropTypes.array.isRequired,
};
