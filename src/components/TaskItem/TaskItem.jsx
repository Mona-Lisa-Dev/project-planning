import { useState, useEffect } from 'react';
import styles from './TaskItem.module.scss';
import ButtonDelete from '../ButtonDelete';

const TaskItem = ({
  id,
  name,
  scheduledHours,
  spentHours = 0,
  allHours = 0,
}) => {
  const [queryCustomTime, setQueryCustomTime] = useState(Number(spentHours));
  const [queryTotalTime, setQueryTotalTime] = useState(Number(allHours));

  const handleInputChange = e => {
    setQueryCustomTime(e.target.value);
    setQueryTotalTime(Number(allHours) + Number(e.target.value));
  };

  // TODO удаление на беке
  const handleDeleteClick = id => {};

  //TODO функция отправляет запрос на бэк для сохранения часов
  const saveCustomTime = () => {};

  useEffect(() => {
    if (typeof queryCustomTime !== 'number' || queryCustomTime < 0) return;

    saveCustomTime(queryCustomTime);
  }, [queryCustomTime]);

  return (
    <li className={styles.taskItem}>
      <p className={styles.taskName}> {name} </p>
      <p className={styles.planTime}> {scheduledHours} </p>
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
