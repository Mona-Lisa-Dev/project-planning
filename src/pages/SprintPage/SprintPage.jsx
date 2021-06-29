import styles from './SprintPage.module.scss';

import TaskList from '../../components/TaskList';

const SprintPage = ({ title }) => {
  const tasks = [
    {
      id: 1,
      taskName: 'first task',
      planTime: '2',
      customTime: '0',
      totalTime: '0',
    },
    {
      id: 2,
      taskName: 'second task',
      planTime: '4',
      customTime: '1',
      totalTime: '1',
    },
    {
      id: 3,
      taskName: 'third task',
      planTime: '2',
      customTime: '0',
      totalTime: '0',
    },
    {
      id: 4,
      taskName: 'fourth task',
      planTime: '4',
      customTime: '1',
      totalTime: '1',
    },
  ];
  return (
    <>
      <div className={styles.sprintContent}>
        <div className={styles.sprintDate}>
          <p>current date</p>
        </div>
        <div className={styles.sprintHeader}>
          <h1 className={styles.title}>{title}</h1>
          <button type="button" className={styles.btnChange}>
            {' '}
          </button>
          <button type="button" className={styles.btnCreateTask}>
            {' '}
          </button>
        </div>

        <TaskList tasks={tasks} />
      </div>
    </>
  );
};

export default SprintPage;
