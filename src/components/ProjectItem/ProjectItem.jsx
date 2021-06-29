import React from 'react';
import styles from './ProjectItem.module.scss';
import PropTypes from 'prop-types';
// import ButtonDelete from '../ButtonDelete';

const ProjectItem = ({ project }) => {
  return (
    <div className={styles.itemWrapper}>
      <h3 className={styles.itemTitle}>{project.name}</h3>
      <p className={styles.itemDescription}> {project.description}</p>
      {/* <ButtonDelete /> */}
    </div>
  );
};

export default ProjectItem;

ProjectItem.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
