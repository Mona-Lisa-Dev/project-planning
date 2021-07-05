import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { confirmAlert } from 'react-confirm-alert';

import '../ButtonDeleteProject/react-confirm-alert.scss';

import { getCurrentTask } from 'redux/tasks/tasks-selectors';
import tasksOperations from 'redux/tasks/tasks-operations';
import ButtonDelete from '../ButtonDelete';
import styles from './TaskItem.module.scss';

const TaskItem = ({ currentSprint, task }) => {
  const { id, name, scheduledTime, spentHours = 0, totalTime = 0 } = task;

  const [queryCustomTime, setQueryCustomTime] = useState(Number(spentHours));
  const [queryTotalTime, setQueryTotalTime] = useState(Number(totalTime));

  // const currentTask = useSelector(getCurrentTask);

  const dispatch = useDispatch();
  // console.log('currentSprint', currentSprint);
  // console.log('currentTask', currentTask);
  // console.log('task', task);

  const handleInputChange = e => {
    setQueryCustomTime(e.target.value);
    setQueryTotalTime(Number(totalTime) + Number(e.target.value));
  };

  const handleDeleteClick = () =>
    dispatch(tasksOperations.deleteTask(currentSprint.id, id));

  //TODO функция отправляет запрос на бэк для сохранения часов
  const saveCustomTime = () => {};

  const handleClick = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className={styles.custom_ui}>
            <h1>Are you sure?</h1>
            <p>You want to delete this task?</p>
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
                handleDeleteClick();
                onClose();
              }}
            >
              Ready
            </button>
          </div>
        );
      },
    });
  };

  useEffect(() => {
    if (typeof queryCustomTime !== 'number' || queryCustomTime < 0) return;

    saveCustomTime(queryCustomTime);
  }, [queryCustomTime]);

  return (
    <li className={styles.taskItem}>
      <p className={styles.taskName}> {name} </p>
      <p className={styles.planTime}> {scheduledTime} </p>
      <div className={styles.inputTimeBefore}>
        <input
          type="text"
          value={queryCustomTime}
          onChange={handleInputChange}
          className={styles.inputTime}
        />
      </div>
      <p className={styles.totalTime}> {queryTotalTime} </p>

      <ButtonDelete handleClick={handleClick} />
    </li>
  );
};

export default TaskItem;
