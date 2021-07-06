import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { confirmAlert } from 'react-confirm-alert';
import '../ButtonDeleteProject/react-confirm-alert.scss';

import tasksOperations from 'redux/tasks/tasks-operations';

import ButtonDelete from '../ButtonDelete';
import styles from './TaskItem.module.scss';

const TaskItem = ({ task }) => {
  const {
    id,
    name,
    project,
    sprint,
    scheduledTime,
    spenHours = 0,
    totalTime = 0,
  } = task;

  // console.log('currentDate', currentDate);

  const [queryCustomTime, setQueryCustomTime] = useState(0);
  const [queryTotalTime, setQueryTotalTime] = useState(totalTime);

  const dispatch = useDispatch();

  useEffect(() => {
    setQueryCustomTime(spenHours);
    setQueryTotalTime(totalTime);
  }, [spenHours, totalTime]);

  const handleInputChange = e => {
    setQueryCustomTime(Number(e.target.value));
    setQueryTotalTime(Number(e.target.value) + queryTotalTime);
    if (typeof queryCustomTime === 'number' && queryCustomTime >= 0) {
      saveCustomTime(queryCustomTime);
    }
  };

  const handleDeleteClick = () => {};
  // dispatch(tasksOperations.deleteTask(currentSprint.id, id));

  //TODO функция отправляет запрос на бэк для сохранения часов
  const saveCustomTime = () => {
    const payload = {
      projectId: project,
      sprintId: sprint,
      taskId: id,
      // day: currentDate,
      value: queryCustomTime,
    };
    dispatch(tasksOperations.updateTask(payload));
  };

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

  return (
    <li className={styles.taskItem}>
      <p className={styles.taskName}> {name} </p>
      <p className={styles.planTime}> {scheduledTime} </p>
      <div className={styles.inputTimeBefore}>
        <input
          type="text"
          value={queryCustomTime}
          onBlur={saveCustomTime}
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
