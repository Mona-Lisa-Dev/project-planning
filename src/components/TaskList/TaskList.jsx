import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './TaskList.module.scss';
import TaskItem from '../TaskItem';
import { useEffect } from 'react';

const TaskList = ({ tasks }) => {
  const [visibleTasks, setVisibleTasks] = useState([]);
  const [isVisibleInputFind, setIsVisibleInputFind] = useState(false);
  const [searchText, setSearchText] = useState('');

  const changesVisibleInputFind = () => {
    setIsVisibleInputFind(!isVisibleInputFind);
  };

  const handleSearchTextChange = e => {
    setSearchText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    //TODO фильтруем массив тасок - проверить такое ли имя в базе
    setVisibleTasks(tasks.filter(task => task.name.includes(searchText)));
  };

  useEffect(() => {
    setVisibleTasks(tasks);
  }, [tasks]);

  return (
    <>
      <div className={styles.taskListHeadContainer}>
        <ul className={styles.taskListHead}>
          <li className={styles.taskListHeadItem}>Task</li>
          <li className={styles.taskListHeadItem}>Scheduled hours</li>
          <li className={styles.taskListHeadItem}>Spent hour / day</li>
          <li className={styles.taskListHeadItem}>Hours spent</li>
        </ul>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <input
            className={
              isVisibleInputFind ? styles.findInputActive : styles.findInput
            }
            type="text"
            value={searchText}
            onChange={handleSearchTextChange}
          ></input>
          <button
            type="button"
            className={styles.buttonFind}
            onClick={changesVisibleInputFind}
          >
            {' '}
          </button>
        </form>
      </div>

      {tasks.length === 0 ? (
        <p className={styles.taskList}>Create first task</p>
      ) : (
        <ul className={styles.taskList}>
          {visibleTasks.map(
            ({ id, name, scheduledHours, spentHours = 0, allHours }) => (
              <TaskItem
                key={id}
                id={id}
                name={name}
                scheduledHours={scheduledHours}
                spentHours={spentHours}
                allHours={allHours}
              />
            ),
          )}
        </ul>
      )}
    </>
  );
};

export default TaskList;

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      scheduledHours: PropTypes.number.isRequired,
      spentHours: PropTypes.number,
      allHours: PropTypes.number,
    }),
  ),
};
