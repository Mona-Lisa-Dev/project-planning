// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css';
import '../ButtonDeleteProject/react-confirm-alert.scss';

import projectsOperations from 'redux/projects/projects-operations';
import { getUserEmail } from 'redux/auth/auth-selectors';
// import { getLoadingProjects } from 'redux/projects/projects-selectors';
// import Spinner from 'components/Loader/Loader';
import ButtonDelete from '../ButtonDeleteProject';

import styles from './ProjectItem.module.scss';

const ProjectItem = ({ project }) => {
  // const loading = useSelector(getLoadingProjects);
  const dispatch = useDispatch();
  const userEmail = useSelector(getUserEmail);

  const handleClickDelete = () =>
    dispatch(projectsOperations.deleteProject(project.id));

  const onClick = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className={styles.custom_ui}>
            <h1>Are you sure?</h1>
            <p>You want to delete this project?</p>
            <button
              className={styles.cancelBtn}
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={styles.rdyBtn}
              type="button"
              onClick={() => {
                handleClickDelete();
                onClose();
              }}
            >
              Ok
            </button>
          </div>
        );
      },
    });
  };

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
      {userEmail === project.owner.email && (
        <div className={styles.buttonWrapper}>
          <ButtonDelete handleClick={onClick} />
        </div>
      )}
    </>
  );
};

export default ProjectItem;

// ProjectItem.propTypes = {
//   name: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
// };
