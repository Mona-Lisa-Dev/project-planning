import PropTypes from 'prop-types';
import styles from './TaskItem.module.scss';
import ButtonDelete from '../ButtonDelete';

const TaskItem = ({ id, taskName, planTime, customTime, totalTime }) => {
  return (
    <>
      <p className={styles.taskName}> {taskName} </p>
      <p className={styles.planTime}> {planTime} </p>
      <div className={styles.inputTimeBefore}>
        <input type="text" value={customTime} className={styles.inputTime} />
      </div>
      <p className={styles.totalTime}> {totalTime} </p>

      <ButtonDelete id={id} />
    </>
  );
};

export default TaskItem;
