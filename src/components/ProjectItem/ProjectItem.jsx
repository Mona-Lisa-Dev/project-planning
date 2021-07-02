// import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import ButtonDelete from '../ButtonDelete';
import projectsOperations from 'redux/projects/projects-operations';

// import { getLoadingProjects } from 'redux/projects/projects-selectors';

import styles from './ProjectItem.module.scss';
// import Spinner from 'components/Loader/Loader';

const ProjectItem = ({ project }) => {
  const dispatch = useDispatch();
  // const loading = useSelector(getLoadingProjects);

  const handleClick = () =>
    dispatch(projectsOperations.deleteProject(project.id));

  return (
    <div className={styles.itemWrapper}>
      {/* {loading && <Spinner />} */}
      <h3 className={styles.itemTitle}>{project.name}</h3>
      <p className={styles.itemDescription}> {project.description}</p>
      <ButtonDelete handleClick={handleClick} />
    </div>
  );
};

export default ProjectItem;

// ProjectItem.propTypes = {
//   name: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
// };
