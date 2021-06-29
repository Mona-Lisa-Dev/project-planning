import { useState, useEffect } from 'react';
import styles from './TaskItem.module.scss';
import ButtonDelete from '../ButtonDelete';

const TaskItem = ({ id, taskName, planTime, customTime, totalTime }) => {
  const [queryCustomTime, setQueryCustomTime] = useState(Number(customTime));
  const [queryTotalTime, setQueryTotalTime] = useState(Number(totalTime));

  const handleInputChange = e => {
    setQueryCustomTime(e.target.value);
    setQueryTotalTime(queryTotalTime + Number(e.target.value));
  };

  //TODO функция отправляет запрос на бэк для сохранения часов
  const saveCustomTime = () => {};

  useEffect(() => {
    if (typeof queryCustomTime !== 'number' || queryCustomTime < 0) return;

    saveCustomTime(queryCustomTime);
  }, [queryCustomTime]);

  return (
    <li className={styles.taskItem}>
      <p className={styles.taskName}> {taskName} </p>
      <p className={styles.planTime}> {planTime} </p>
      <div className={styles.inputTimeBefore}>
        <input
          type="text"
          value={queryCustomTime}
          onChange={handleInputChange}
          className={styles.inputTime}
        />
      </div>
      <p className={styles.totalTime}> {queryTotalTime} </p>

      <ButtonDelete id={id} />
    </li>
  );
};

export default TaskItem;
