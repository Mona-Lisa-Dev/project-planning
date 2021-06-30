import styles from './SprintPage.module.scss';
import { useState, useEffect } from 'react';
import TaskList from '../../components/TaskList';
import Modal from 'components/Modal';

const SprintPage = ({ sprintId }) => {
  const [tasks, setTasks] = useState([]);
  const [sprintName, setSprintName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showChangeTitleForm, setShowChangeTitleForm] = useState(false);

  const handleClickBtnChange = () => {
    setShowChangeTitleForm(!showChangeTitleForm);
  };
  const handleSubmit = e => {
    e.preventDefault();
    setShowChangeTitleForm(!showChangeTitleForm);
    //TODO запрос на бэк для обновление названия спринта
  };
  const handleInputChangeTitle = e => {
    setSprintName(e.target.value);
  };

  useEffect(() => {
    //TODO fetch tasks and SprintName
    setTasks([
      {
        id: 1,
        taskName: 'first task',
        planTime: '2',
        customTime: '1',
        totalTime: '1',
      },
      {
        id: 2,
        taskName: 'second task',
        planTime: '4',
        customTime: '1',
        totalTime: '1',
      },
      {
        id: 3,
        taskName: 'third task',
        planTime: '4',
        customTime: '0',
        totalTime: '0',
      },
      {
        id: 4,
        taskName: 'fourth task',
        planTime: '4',
        customTime: '1',
        totalTime: '1',
      },
    ]);
    setSprintName('This is name of sprint');
  }, [sprintId]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <aside></aside>

      <div className={styles.sprintContent}>
        <div className={styles.sprintDate}>
          <p>current date</p>
        </div>
        <div className={styles.sprintHeader}>
          <h1
            className={showChangeTitleForm ? styles.titleDisable : styles.title}
          >
            {sprintName}
          </h1>

          <form
            onSubmit={handleSubmit}
            className={
              showChangeTitleForm
                ? styles.changeTitleFormActive
                : styles.changeTitleForm
            }
          >
            <input
              className={styles.inputChangeTitle}
              value={sprintName}
              onChange={handleInputChangeTitle}
            ></input>
            <button type="submit" className={styles.btnSaveChange}>
              {' '}
            </button>
          </form>

          <button
            type="button"
            className={
              showChangeTitleForm ? styles.btnChangeDisable : styles.btnChange
            }
            onClick={handleClickBtnChange}
          >
            {' '}
          </button>
          <button
            type="button"
            className={styles.btnCreateTask}
            onClick={toggleModal}
          >
            {' '}
          </button>
        </div>

        <TaskList tasks={tasks} />
      </div>

      {showModal && (
        <Modal onCloseModal={toggleModal}>
          <h2>Create Task</h2>
        </Modal>
      )}
    </>
  );
};

export default SprintPage;
