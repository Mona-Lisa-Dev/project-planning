import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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

  useEffect(() => {
    dispatch(tasksOperations.getTaskById(currentSprint?.id, task?.id));
  }, [currentSprint.id, dispatch, task.id]);

  const handleInputChange = e => {
    setQueryCustomTime(e.target.value);
    setQueryTotalTime(Number(totalTime) + Number(e.target.value));
  };

  const handleDeleteClick = () =>
    dispatch(tasksOperations.deleteTask(currentSprint.id, id));

  //TODO функция отправляет запрос на бэк для сохранения часов
  const saveCustomTime = () => {};

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

      <ButtonDelete handleClick={handleDeleteClick} />
    </li>
  );
};

export default TaskItem;
