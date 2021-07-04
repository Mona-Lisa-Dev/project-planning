import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'components/Loader/Loader';

import projectsOperations from 'redux/projects/projects-operations';
import { getLoadingProjects } from 'redux/projects/projects-selectors';

import styles from './CreateProject.module.scss';

const CreateProject = ({ onClickCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [emptyInput, setEmptyInput] = useState(false);
  const loading = useSelector(getLoadingProjects);

  const dispatch = useDispatch();

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!name) {
      setEmptyInput(true);
      return;
    }
    const newProject = {
      name,
      description,
    };

    dispatch(projectsOperations.createProject(newProject));
    onClickCancel();

    setName('');
    setDescription('');
    setEmptyInput(false);
  };

  return (
    <div className={styles.form}>
      <h2 className={styles.title}>Creating a project</h2>
      <form onSubmit={handleSubmit} autoComplete="off" className={styles.form}>
        <label className={styles.labelForm}>
          <input
            value={name}
            name="name"
            type="text"
            placeholder={emptyInput ? 'Please enter project name' : ' '}
            className={emptyInput ? styles.empty_input : styles.input_name}
            onChange={handleNameChange}
          />
          <span className={styles.nameInput}>Project name</span>
        </label>
        <label className={styles.labelForm}>
          <input
            id="add"
            value={description}
            name="description"
            type="text"
            placeholder={emptyInput ? 'Please enter description' : ' '}
            className={emptyInput ? styles.empty_input : styles.input}
            onChange={handleDescriptionChange}
          />
          <span className={styles.nameInput}>Descirption</span>
        </label>

        {loading && <Spinner />}

        <button type="submit" className={styles.ready_btn}>
          Ready
        </button>

        <button
          type="button"
          className={styles.cancel_btn}
          onClick={onClickCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

CreateProject.propTypes = {
  onClickCancel: PropTypes.func.isRequired,
};

export default CreateProject;
