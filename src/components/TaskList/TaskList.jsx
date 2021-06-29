import PropTypes from 'prop-types';
import styles from './TaskList.module.scss';
import TaskItem from '../TaskItem';

const TaskList = ({ tasks }) => {
  return (
    <>
      <div className={styles.taskListHeadContainer}>
        <ul className={styles.taskListHead}>
          <li className={styles.taskListHeadItem}>Task</li>
          <li className={styles.taskListHeadItem}>Scheduled hours</li>
          <li className={styles.taskListHeadItem}>Spent hour / day</li>
          <li className={styles.taskListHeadItem}>Hours spent</li>
        </ul>
        <input className={styles.findInputActive} type="text"></input>
        <button type="button" className={styles.buttonFind}></button>
      </div>

      <ul className={styles.taskList}>
        {tasks.map(({ id, taskName, planTime, customTime = 0, totalTime }) => (
          <li key={id} className={styles.taskItem}>
            <TaskItem
              id={id}
              taskName={taskName}
              planTime={planTime}
              customTime={customTime}
              totalTime={totalTime}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      taskName: PropTypes.string.isRequired,
      planTime: PropTypes.number.isRequired,
      customTime: PropTypes.number,
      totalTime: PropTypes.number,
    }),
  ),
};
