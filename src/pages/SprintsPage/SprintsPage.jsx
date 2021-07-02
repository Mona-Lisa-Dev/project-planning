import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useMediaQuery } from '@material-ui/core';
import { refs } from './refs';
import { ReactComponent as EditIcon } from './svg/edit_icon.svg';
import { ReactComponent as AddGroupIcon } from './svg/add_group_icon.svg';
import { ReactComponent as PlusButtonIcon } from './svg/plus_button_icon.svg';

import SideBar from 'components/SideBar';
import Modal from 'components/Modal';
import CreateSprint from 'components/CreateSprint';
import SprintList from 'components/SprintList';
import AddPeopleForm from 'components/AddPeopleForm';
import {
  getProjects,
  getCurrentProject,
} from 'redux/projects/projects-selectors';
import sprintsOperations from 'redux/sprints/sprints-operations';
import projectsOperations from 'redux/projects/projects-operations';

import s from './SprintsPage.module.scss';

const SprintsPage = props => {
  const [showModalAddPeople, setShowModalAddPeople] = useState(false);
  const [showModalCreateSprint, setShowModalCreateSprint] = useState(false);

  const { projectId } = props.match.params;
  const dispatch = useDispatch();

  const projects = useSelector(getProjects);
  const currentProject = useSelector(getCurrentProject);

  useEffect(() => {
    dispatch(sprintsOperations.getAllSprints(projectId));
    dispatch(projectsOperations.getProjectById(projectId));
  }, [dispatch, projectId]);

  const handleMaxWidth = width => {
    return `(max-width:${width}px) `;
  };

  const handleMinWidth = width => {
    return `(min-width:${width}px) `;
  };

  const tablet = useMediaQuery(handleMinWidth(refs.tablet));
  const tabletMax = useMediaQuery(handleMaxWidth(refs.tabletMax));
  const desktop = useMediaQuery(handleMinWidth(refs.desktop));

  // const toggleModal = () => {
  //   setShowModal(!showModal);
  // };

  const openModalAddPeople = () => setShowModalAddPeople(true);
  const openModalCreateSprint = () => setShowModalCreateSprint(true);
  const handleCloseModal = () => {
    setShowModalAddPeople(false);
    setShowModalCreateSprint(false);
  };

  return (
    <>
      <main>
        <aside>
          <SideBar>
            <div className={s.sideBarPlug}>
              <ul>
                {projects.map(project => (
                  <li key={project.id}>
                    <Link
                      to={{
                        pathname: `/projects/${project.id}`,
                      }}
                    >
                      <h3>{project.name}</h3>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </SideBar>
        </aside>

        <article>
          <div className={s.headerWrap}>
            <div className={s.contentWrap}>
              <div className={s.titleWrap}>
                <h2>{currentProject?.name}</h2>
                <EditIcon className={s.EditIcon} />
              </div>
              <p>{currentProject?.description}</p>
              <div className={s.addWrap}>
                <AddGroupIcon className={s.AddGroupIcon} />
                <span onClick={openModalAddPeople}>Add people</span>
              </div>
            </div>
            {tabletMax && (
              <PlusButtonIcon
                className={s.PlusButtonIconFixed}
                onClick={openModalCreateSprint}
              />
            )}
            {tablet && (
              <div className={s.createSprintWrap}>
                {tablet && (
                  <PlusButtonIcon
                    className={s.PlusButtonIcon}
                    onClick={openModalCreateSprint}
                  />
                )}
                {desktop && <span>Create a sprint</span>}
              </div>
            )}
          </div>

          <SprintList currentProject={currentProject} />
        </article>
      </main>

      {showModalAddPeople && (
        <Modal onCloseModal={handleCloseModal}>
          <AddPeopleForm
            onClickCancel={handleCloseModal}
            projectId={projectId}
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
    </>
  );
};

export default SprintsPage;
