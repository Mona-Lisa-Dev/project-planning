import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import dayjs from 'dayjs';

import TaskList from 'components/TaskList';
import Modal from 'components/Modal';
import CreateTaskForm from 'components/CreateTaskForm';
import SideBar from 'components/SideBar';
import CreateSprint from 'components/CreateSprint';
import DiagramModal from 'components/Diagram/DiagramModal';
import { getTasks, getError } from 'redux/tasks/tasks-selectors';
import { getSprints, getCurrentSprint } from 'redux/sprints/sprints-selectors';
import sprintsOperations from 'redux/sprints/sprints-operations';
import tasksOperations from 'redux/tasks/tasks-operations';
import swal from 'sweetalert';
import styles from './TasksPage.module.scss';

const TasksPage = props => {
  const [sprintName, setSprintName] = useState('');
  const [showModalCreateTask, setShowModalCreateTask] = useState(false);
  const [showModalCreateSprint, setShowModalCreateSprint] = useState(false);
  const [showModalAnalytics, setShowModalAnalytics] = useState(false);
  const [showChangeTitleForm, setShowChangeTitleForm] = useState(false);

  const [currentDay, setCurrentDay] = useState(1);

  const [page, setPage] = useState(1);
  const [paginationDate, setPaginationDate] = useState('');
  const [clickOnPage, setClickOnPage] = useState(false);

  const { projectId, sprintId } = props.match.params;
  const dispatch = useDispatch();

  const currentSprint = useSelector(getCurrentSprint);
  const sprints = useSelector(getSprints);
  const tasks = useSelector(getTasks);
  const Error = useSelector(getError);
  const history = useHistory();

  useEffect(() => {
    Error &&
      swal({
        text: `${Error}`,
        icon: 'error',
        button: { text: 'OK', className: `${styles.swalButton}` },
      });
  }, [Error]);

  useEffect(() => {
    (async function () {
      const sprint = await dispatch(
        sprintsOperations.getSprintById(projectId, sprintId),
      );

      !sprint && history.push(`/projects/${projectId}`);

      await dispatch(
        tasksOperations.getTasksByDay(
          sprintId,
          dayjs(new Date()).format('YYYY-MM-DD'),
        ),
      );
    })();
  }, [dispatch, projectId, sprintId]);

  const arrDate = currentSprint?.totalDaly?.reduce(
    (acc, day) => [...acc, Object.keys(day)[0]],
    [],
  );

  const [clickOnSprintLink, setClickOnSprintLink] = useState(false);

  const onClickSprintLink = () => {
    setClickOnSprintLink(true);
    console.log('отработал');
  };

  useEffect(() => {
    if (!clickOnPage || clickOnSprintLink) {
      setClickOnSprintLink(false);
      arrDate?.map((el, ind, arr) => {
        if (el === dayjs(new Date()).format('YYYY-MM-DD')) {
          setPage(ind + 1);
          setPaginationDate(dayjs(new Date()).format('YYYY-MM-DD'));
        }

        if (
          arr.length < page ||
          !arr.includes(dayjs(new Date()).format('YYYY-MM-DD'))
        ) {
          setPage(1);
          setPaginationDate(arr[0]);
        }
      });
    }
  }, [arrDate, clickOnPage, paginationDate]);

  useEffect(() => {
    dispatch(sprintsOperations.getAllSprints(projectId));
    //
  }, [dispatch, projectId, sprintId]);

  const onClickDay = () => {
    setClickOnPage(true);
    const day = arrDate.find((el, ind) => {
      if (ind === page - 2) {
        setPaginationDate(el);
        return el;
      }
    });

    arrDate?.map((el, ind) => {
      if (el === day) {
        setPage(prevState => prevState - 1);
      }
    });

    setCurrentDay(currentDay === 1 ? currentDay : currentDay - 1);
    dispatch(tasksOperations.getTasksByDay(currentSprint.id, paginationDate));
  };

  const onClickNextDay = () => {
    setClickOnPage(true);
    const day = arrDate.find((el, ind) => {
      if (ind === page) {
        setPaginationDate(el);
        return el;
      }
    });

    arrDate?.map((el, ind) => {
      if (el === day) {
        setPage(prevState => prevState + 1);
      }
    });

    setCurrentDay(currentDay !== arrDate.length ? currentDay + 1 : currentDay);
    dispatch(tasksOperations.getTasksByDay(currentSprint.id, paginationDate));
  };

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
                        onClick={onClickSprintLink}
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
                <div className={styles.createNewSprintWrap}>
                  <button
                    type="button"
                    className={styles.btnCreateSprint}
                    onClick={openModalCreateSprint}
                  ></button>
                  <span>Create a sprint</span>
                </div>
              </div>
            </SideBar>
          </aside>

          <div className={styles.sprintContent}>
            <div className={styles.sprintDate}>
              <ul className={styles.pagination}>
                {arrDate.map((day, i) => (
                  <li
                    key={day}
                    className={
                      currentDay === i + 1
                        ? styles.paginationItem
                        : styles.paginationItemNone
                    }
                  >
                    <button
                      type="button"
                      onClick={onClickDay}
                      className={styles.btnBefore}
                      disabled={page === 1 ? true : false}
                    >
                      {'<'}
                    </button>

                    <p className={styles.currentDay}>{page} / </p>
                    <p className={styles.totalDay}>{arrDate.length}</p>
                    <button
                      type="button"
                      onClick={onClickNextDay}
                      className={styles.btnNext}
                      disabled={page === arrDate.length ? true : false}
                    >{`>`}</button>
                    <p className={styles.calendarDay}> {paginationDate}</p>
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
            {tasks.length > 2 && !showModalAnalytics && (
              <button
                type="button"
                className={styles.btnOpenAnalytics}
                onClick={openModalAnalytics}
              ></button>
            )}
            <TaskList tasks={tasks} />
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
        {showModalAnalytics && (
          <DiagramModal
            sprint={currentSprint}
            onCloseModal={handleCloseModal}
          />
        )}
      </>
    )
  );
};

export default TasksPage;
