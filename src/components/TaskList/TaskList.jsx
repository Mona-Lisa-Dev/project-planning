// import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskItem from '../TaskItem';
import { getFilter, getVisibleTasks } from 'redux/tasks/tasks-selectors';
import * as tasksActions from 'redux/tasks/tasks-actions';

import styles from './TaskList.module.scss';

const TaskList = ({ tasks }) => {
  const [isVisibleInputFind, setIsVisibleInputFind] = useState(false);

  const filter = useSelector(getFilter);
  const visibleTasks = useSelector(getVisibleTasks);

  const dispatch = useDispatch();
  console.log('tasks', tasks);

  const changesVisibleInputFind = () => {
    setIsVisibleInputFind(!isVisibleInputFind);
  };

  const handleSearchTextChange = e => {
    dispatch(tasksActions.changeFilter(e.currentTarget.value));
  };

  return (
    <>
      <div className={styles.taskListHeadContainer}>
        <ul className={styles.taskListHead}>
          <li className={styles.taskListHeadItem}>Task</li>
          <li className={styles.taskListHeadItem}>Scheduled hours</li>
          <li className={styles.taskListHeadItem}>Spent hour / day</li>
          <li className={styles.taskListHeadItem}>Hours spent</li>
        </ul>

        <label>
          <input
            className={
              isVisibleInputFind ? styles.findInputActive : styles.findInput
            }
            type="text"
            value={filter}
            onChange={handleSearchTextChange}
            onBlur={changesVisibleInputFind}
          ></input>
          <button
            type="button"
            className={styles.buttonFind}
            onClick={changesVisibleInputFind}
          ></button>
        </label>
      </div>

      {tasks.length === 0 ? (
        <p className={styles.taskList}>Create first task</p>
      ) : (
        <ul className={styles.taskList}>
          {visibleTasks.map(
            ({ id, name, sprint, scheduledTime, totalTime, byDay }) => (
              <TaskItem
                key={id}
                id={id}
                name={name}
                sprint={sprint}
                scheduledTime={scheduledTime}
                totalTime={totalTime}
                byDay={byDay}
              />
            ),
          )}
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
