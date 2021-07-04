// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import projectsOperations from 'redux/projects/projects-operations';
// import { getLoadingProjects } from 'redux/projects/projects-selectors';
// import Spinner from 'components/Loader/Loader';
import ButtonDelete from '../ButtonDeleteProject';

import styles from './ProjectItem.module.scss';

const ProjectItem = ({ project }) => {
  // const loading = useSelector(getLoadingProjects);
  const dispatch = useDispatch();

  const handleClick = () =>
    dispatch(projectsOperations.deleteProject(project.id));

  return (
    <>
      <Link
        to={{
          pathname: `/projects/${project.id}`,
        }}
      >
        <div className={styles.itemWrapper}>
          {/* {loading && <Spinner />} */}
          <h3 className={styles.itemTitle}>{project.name}</h3>
          <p className={styles.itemDescription}> {project.description}</p>
        </div>
      </Link>
      <div className={styles.buttonWrapper}>
        <ButtonDelete handleClick={handleClick} />
      </div>
    </>
  );
};

export default ProjectItem;

// ProjectItem.propTypes = {
//   name: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
// };
