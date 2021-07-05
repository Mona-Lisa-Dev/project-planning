import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import dayjs from 'dayjs';

import TaskList from 'components/TaskList';
import Modal from 'components/Modal';
import CreateTaskForm from 'components/CreateTaskForm';
import SideBar from 'components/SideBar';
import CreateSprint from 'components/CreateSprint';
import DiagramModal from 'components/Diagram/DiagramModal';

import { getSprints, getCurrentSprint } from 'redux/sprints/sprints-selectors';
import sprintsOperations from 'redux/sprints/sprints-operations';

import styles from './TasksPage.module.scss';

const TasksPage = props => {
  const [sprintName, setSprintName] = useState('');
  const [showModalCreateTask, setShowModalCreateTask] = useState(false);
  const [showModalCreateSprint, setShowModalCreateSprint] = useState(false);
  const [showModalAnalytics, setShowModalAnalytics] = useState(false);
  const [showChangeTitleForm, setShowChangeTitleForm] = useState(false);
  const [renderTasks, setRenderTasks] = useState(false);
  const [oneDayTasks, setOneDayTasks] = useState([]);

  const { projectId, sprintId } = props.match.params;
  const dispatch = useDispatch();

  const currentSprint = useSelector(getCurrentSprint);
  const sprints = useSelector(getSprints);

  const getAllTasksForToday = () => {
    const { days } = currentSprint;

    const today = new Date();
    const todayFormat = dayjs(today).format('YYYY-MM-DD');

    days?.map(day => todayFormat === day.date && setOneDayTasks(day.tasks));
    // days.map(day => {
    //   if (todayFormat === day.date) {
    //     console.log('day.date', day.date);
    //     return setOneDayTasks(day.tasks);
    //   }
    // });
  };

  console.log('oneDayTasks', oneDayTasks);
  // console.log('currentSprint', currentSprint);

  const arrDate = currentSprint?.days?.reduce(
    (acc, day) => [...acc, day.date],
    [],
  );

  const onClickDay = date => {
    currentSprint?.days?.map(
      day => date === day.date && setOneDayTasks(day.tasks),
      // day => {
      //   if (date === day.date) {
      //     console.log('day.date', day.date);
      //     return setOneDayTasks(day.tasks);
      //   }
      // },
    );
  };

  useEffect(() => setRenderTasks(true), []);
  useEffect(() => {
    dispatch(sprintsOperations.getSprintById(projectId, sprintId));
  }, [dispatch, projectId, sprintId]);

  if (renderTasks && currentSprint) {
    getAllTasksForToday();
    setRenderTasks(false);
  }

  const handleCloseModal = () => {
    setRenderTasks(true);
    setShowModalCreateTask(false);
    setShowModalCreateSprint(false);
    setShowModalAnalytics(false);
  };
  const openModalCreateSprint = () => {
    setShowModalCreateSprint(true);
  };
  const openModalCreateTask = () => {
    setShowModalCreateTask(true);
  };
  const openModalAnalytics = () => {
    setShowModalAnalytics(true);
  };

  const handleClickBtnChange = () => {
    setSprintName(currentSprint?.name);
    setShowChangeTitleForm(!showChangeTitleForm);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (currentSprint.name !== sprintName || sprintName !== '') {
      dispatch(
        sprintsOperations.updateSprint(projectId, sprintId, {
          name: sprintName,
        }),
      );
    }

    setShowChangeTitleForm(!showChangeTitleForm);
  };

  const handleInputChangeTitle = e => {
    setSprintName(e.target.value);
  };

  return (
    currentSprint && (
      <>
        <main>
          <aside>
            <SideBar>
              <Link
                className={styles.linkToBack}
                to={{
                  pathname: `/projects/${projectId}`,
                }}
              >
                Show sprints
              </Link>
              <div className={styles.navSprintsList}>
                <ul>
                  {sprints.map(sprint => (
                    <li key={sprint.id}>
                      <NavLink
                        className={styles.linkToSprint}
                        activeClassName={styles.linkToSprintActive}
                        to={{
                          pathname: `/projects/${projectId}/${sprint.id}`,
                        }}
                      >
                        <div className={styles.sprintsWrap}>
                          <span />
                          <h3>{sprint.name}</h3>
                        </div>
                      </NavLink>
                    </li>
                  ))}
                </ul>

                {/*Кнопка создания спринта в сайдбаре */}
                <button
                  type="button"
                  className={styles.btnCreateSprint}
                  onClick={openModalCreateSprint}
                ></button>
              </div>
            </SideBar>
          </aside>

          <div className={styles.sprintContent}>
            <div className={styles.sprintDate}>
              <ul>
                {arrDate?.map((day, i) => (
                  <li key={day}>
                    <button type="button" onClick={() => onClickDay(day)}>
                      {i + 1}
                    </button>
                    <p> {day}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.sprintHeader}>
              <h1
                className={
                  showChangeTitleForm ? styles.titleDisable : styles.title
                }
              >
                {currentSprint?.name}
              </h1>

              <form
                onSubmit={handleSubmit}
                className={
                  showChangeTitleForm
                    ? styles.changeTitleFormActive
                    : styles.changeTitleForm
                }
              >
                <input
                  className={styles.inputChangeTitle}
                  value={sprintName}
                  onChange={handleInputChangeTitle}
                ></input>
                {/* Кнопка сoхранения нового названия */}
                <button type="submit" className={styles.btnSaveChange}></button>
              </form>

              {/* Кнопка открытия формы для изменения названия */}
              <button
                type="button"
                className={
                  showChangeTitleForm
                    ? styles.btnChangeDisable
                    : styles.btnChange
                }
                onClick={handleClickBtnChange}
              ></button>

              {/* Кнопка открытия модалки создания новой задачи */}
              <button
                type="button"
                className={styles.btnCreateTask}
                onClick={openModalCreateTask}
              ></button>
            </div>
            {/* Кнопка открытия модалки с аналитикой */}
            {oneDayTasks.length > 2 && (
              <button
                type="button"
                className={styles.btnOpenAnalytics}
                onClick={openModalAnalytics}
              ></button>
            )}
            <TaskList currentSprint={currentSprint} tasks={oneDayTasks} />
          </div>
        </main>

        {showModalCreateTask && (
          <Modal onCloseModal={handleCloseModal}>
            <CreateTaskForm
              projectId={projectId}
              sprintId={sprintId}
              onClickCancel={handleCloseModal}
            />
          </Modal>
        )}
        {showModalCreateSprint && (
          <Modal onCloseModal={handleCloseModal}>
            <CreateSprint
              onClickCancel={handleCloseModal}
              projectId={projectId}
            />
          </Modal>
        )}
        {showModalAnalytics && <DiagramModal onCloseModal={handleCloseModal} />}
      </>
    )
  );
};

export default TasksPage;
