import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskList from 'components/TaskList';
import Modal from 'components/Modal';
import CreateTaskForm from 'components/CreateTaskForm';
import SideBar from 'components/SideBar';

import styles from './TasksPage.module.scss';

const TasksPage = props => {
  const [tasks, setTasks] = useState([]);
  const [sprintName, setSprintName] = useState('');
  const [showModalCreateTask, setShowModalCreateTask] = useState(false);
  const [showModalCreateSprint, setShowModalCreateSprint] = useState(false);
  const [showModalAnalytics, setShowModalAnalytics] = useState(false);
  const [showChangeTitleForm, setShowChangeTitleForm] = useState(false);

  const { projectId, sprintId } = props.match.params;

  const handleCloseModal = () => {
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
    setShowChangeTitleForm(!showChangeTitleForm);
  };
  const handleSubmit = e => {
    e.preventDefault();
    setShowChangeTitleForm(!showChangeTitleForm);
    //TODO запрос на бэк для обновление названия спринта
  };
  const handleInputChangeTitle = e => {
    setSprintName(e.target.value);
  };

  useEffect(() => {
    //TODO fetch tasks and SprintName
    setTasks([
      {
        id: 1,
        name: 'first task',
        scheduledHours: '2',
        spentHours: '1',
        allHours: '1',
      },
      {
        id: 2,
        name: 'second task',
        scheduledHours: '4',
        spentHours: '1',
        allHours: '1',
      },
      {
        id: 3,
        name: 'third task',
        scheduledHours: '4',
        spentHours: '0',
        allHours: '0',
      },
      {
        id: 4,
        name: 'fourth task',
        scheduledHours: '4',
        spentHours: '1',
        allHours: '1',
      },
    ]);
    setSprintName('This is name of sprint');
  }, [sprintId]);

  return (
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
                {/* //Todo вставить линки на спринты* поменять на навлинки и добавить активный класс*/}
                <li>
                  <Link className={styles.linkToSprint}> 1 Sprint</Link>
                </li>
              </ul>

              {/*Кнопка создания спринта в сайдбаре */}
              <button
                type="button"
                className={styles.btnCreateSprint}
                onClick={openModalCreateSprint}
              >
                {' '}
              </button>
            </div>
          </SideBar>
        </aside>

        <div className={styles.sprintContent}>
          <div className={styles.sprintDate}>
            {/*TODO Пагинация */}
            <p>current date</p>
          </div>

          <div className={styles.sprintHeader}>
            <h1
              className={
                showChangeTitleForm ? styles.titleDisable : styles.title
              }
            >
              {sprintName}
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
              <button type="submit" className={styles.btnSaveChange}>
                {' '}
              </button>
            </form>

            {/* Кнопка открытия формы для изменения названия */}
            <button
              type="button"
              className={
                showChangeTitleForm ? styles.btnChangeDisable : styles.btnChange
              }
              onClick={handleClickBtnChange}
            >
              {' '}
            </button>

            {/* Кнопка открытия модалки создания новой задачи */}
            <button
              type="button"
              className={styles.btnCreateTask}
              onClick={openModalCreateTask}
            >
              {' '}
            </button>
          </div>

          {/* Кнопка открытия модалки с аналитикой */}
          {tasks.length > 2 && (
            <button
              type="button"
              className={styles.btnOpenAnalytics}
              onClick={openModalAnalytics}
            >
              {' '}
            </button>
          )}

          <TaskList tasks={tasks} />
        </div>
      </main>

      {showModalCreateTask && (
        <Modal onCloseModal={handleCloseModal}>
          <CreateTaskForm />
        </Modal>
      )}
      {showModalCreateSprint && (
        <Modal onCloseModal={handleCloseModal}>
          <h3>Create Sprint</h3>
        </Modal>
      )}
      {showModalAnalytics && (
        <h3>Analytics</h3>
        // TODO Modal
      )}
    </>
  );
};

export default TasksPage;
