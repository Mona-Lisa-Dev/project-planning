import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';

import { confirmAlert } from 'react-confirm-alert';
import '../ButtonDeleteProject/react-confirm-alert.scss';

import sprintsOperations from 'redux/sprints/sprints-operations';
import tasksOperations from 'redux/tasks/tasks-operations';

import ButtonDelete from '../ButtonDelete';
import styles from './TaskItem.module.scss';

const TaskItem = ({
  id,
  name,
  sprint,
  scheduledTime,
  totalTime,
  byDay,
  project,
  paginationDate,
}) => {
  const [queryCustomTime, setQueryCustomTime] = useState(0);
  const [day, setDay] = useState('');
  // const [queryTotalTime, setQueryTotalTime] = useState(totalTime);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!byDay) return;
    setQueryCustomTime(Object.values(byDay)[0]);
    setDay(Object.keys(byDay)[0]);
  }, [byDay]);

  const handleInputChange = e => {
    if (isNaN(e.target.value)) return;

    // if (spenHours === Number(e.target.value)) return; //
    setQueryCustomTime(Number(e.target.value));
  };

  const handleDeleteClick = async () => {
    await dispatch(tasksOperations.deleteTask(sprint, id));
    await dispatch(
      tasksOperations.getTasksByDay(
        sprint,
        day || dayjs(new Date()).format('YYYY-MM-DD'),
      ),
    );
    await dispatch(sprintsOperations.getSprintById(project, sprint));
  };

  //TODO функция отправляет запрос на бэк для сохранения часов
  const onSubmitRequest = async () => {
    const payload = {
      sprintId: sprint,
      taskId: id,
      day: paginationDate,
      value: queryCustomTime,
    };

    await dispatch(tasksOperations.updateTask(payload));
    await dispatch(tasksOperations.getTasksByDay(sprint, paginationDate));
    await dispatch(sprintsOperations.getSprintById(project, sprint));

    // setQueryTotalTime(
    //   Number(queryCustomTime) + Number(queryTotalTime) - Number(spenHours),
    // );
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
              Ok
            </button>
          </div>
        );
      },
    });
  };

  return (
    <li className={styles.taskItem}>
      <p className={styles.taskName} data-text={name}>
        {' '}
        {name}{' '}
      </p>
      <p className={styles.planTime}> {scheduledTime} </p>
      <div className={styles.inputTimeBefore}>
        <input
          type="text"
          value={queryCustomTime}
          onBlur={onSubmitRequest}
          onChange={handleInputChange}
          className={styles.inputTime}
        />
      </div>
      <p className={styles.totalTime}> {totalTime} </p>

      <ButtonDelete handleClick={handleClick} />
    </li>
  );
};

TaskItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sprint: PropTypes.string.isRequired,
  scheduledTime: PropTypes.number.isRequired,
  totalTime: PropTypes.number.isRequired,
  byDay: PropTypes.object,
  project: PropTypes.string.isRequired,
  paginationDate: PropTypes.string.isRequired,
};

export default TaskItem;
