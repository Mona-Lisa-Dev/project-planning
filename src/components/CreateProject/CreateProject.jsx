import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import styles from './CreateProject.module.scss';

const CreateProject = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [projects, setProjects] = useState([]);
  const [emptyInput, setEmptyInput] = useState(false);

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
      id: uuidv4(),
      name,
      description,
    };

    setProjects(prevState => [newProject, ...prevState]);

    // dispatch(addProject({ project, description }));

    setName('');
    setDescription('');
    setEmptyInput(false);
  };

  return (
    <div className={styles.form}>
      <h2 className={styles.title}>Creating a project</h2>
      <form onSubmit={handleSubmit} autoComplete="off" className={styles.form}>
        <label>
          <input
            id="add"
            value={setName}
            type="text"
            placeholder={emptyInput ? 'Project name' : 'Project name'}
            className={emptyInput ? styles.empty_input : styles.input}
            onChange={handleNameChange}
          />
        </label>
        <label>
          <input
            id="add"
            value={setDescription}
            type="text"
            placeholder={emptyInput ? 'Description' : 'Description'}
            className={emptyInput ? styles.empty_input : styles.input}
            onChange={handleDescriptionChange}
          />
        </label>
      </form>

      <button form="add" type="submit" className={styles.ready_btn}>
        Ready
      </button>
      <button form="add" type="button" className={styles.cancel_btn}>
        Cancel
      </button>
    </div>
  );
};

export default CreateProject;
