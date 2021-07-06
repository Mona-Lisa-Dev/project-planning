// import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TaskItem from '../TaskItem';
import * as tasksActions from 'redux/tasks/tasks-actions';

import styles from './TaskList.module.scss';

const TaskList = ({ tasks }) => {
  const [visibleTasks, setVisibleTasks] = useState([]);
  const [isVisibleInputFind, setIsVisibleInputFind] = useState(false);
  const [searchText, setSearchText] = useState('');

  const dispatch = useDispatch();

  const changesVisibleInputFind = () => {
    setIsVisibleInputFind(!isVisibleInputFind);
  };

  const handleSearchTextChange = e => {
    // dispatch(tasksActions.changeFilter(e.currentTarget.value));
    setSearchText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const normalizedSearchText = searchText.toLowerCase();
    setVisibleTasks(
      tasks.filter(task =>
        task.name.toLowerCase().includes(normalizedSearchText),
      ),
    );
  };

  useEffect(() => {
    setVisibleTasks(tasks);
    console.log(`visible tasks`, visibleTasks);
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
          ></button>
        </form>
      </div>

      {tasks.length === 0 ? (
        <p className={styles.taskList}>Create first task</p>
      ) : (
        <ul className={styles.taskList}>
          {visibleTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </>
  );
};

export default TaskList;

// TaskList.propTypes = {
//   tasks: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       scheduledHours: PropTypes.number.isRequired,
//       spentHours: PropTypes.number,
//       allHours: PropTypes.number,
//     }),
//   ),
// };
