// import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import projectsOperations from 'redux/projects/projects-operations';

import ButtonDelete from '../ButtonDelete';

// import { getLoadingProjects } from 'redux/projects/projects-selectors';

import styles from './ProjectItem.module.scss';
// import Spinner from 'components/Loader/Loader';

const ProjectItem = ({ project }) => {
  // const loading = useSelector(getLoadingProjects);
  const dispatch = useDispatch();

  const handleClick = () =>
    dispatch(projectsOperations.deleteProject(project.id));

  return (
    <>
      <NavLink
        className={styles.NavLink}
        to={{
          pathname: `/projects/${project.id}`,
        }}
      >
        <div className={styles.itemWrapper}>
          {/* {loading && <Spinner />} */}
          <h3 className={styles.itemTitle}>{project.name}</h3>
          <p className={styles.itemDescription}> {project.description}</p>
        </div>
      </NavLink>
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
