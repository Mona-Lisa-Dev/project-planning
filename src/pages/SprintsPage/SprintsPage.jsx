import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useMediaQuery } from '@material-ui/core';
import { refs } from './refs';
import { ReactComponent as EditIcon } from './svg/edit_icon.svg';
import { ReactComponent as AddGroupIcon } from './svg/add_group_icon.svg';
import { ReactComponent as CreateNewSprint } from './svg/plus_button_icon.svg';
import { ReactComponent as CreateNewProject } from './svg/plus_button_icon_two.svg';

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
  const [showModal, setShowModal] = useState(false);
  const [el, setEl] = useState('');

  const toggleModal = el => {
    setEl(el);
    setShowModal(!showModal);
    console.log('name', el);
  };

  const { projectId } = props.match.params;
  const dispatch = useDispatch();

  const projects = useSelector(getProjects);
  const currentProject = useSelector(getCurrentProject);

  useEffect(() => {
    dispatch(sprintsOperations.getAllSprints(projectId));
    dispatch(projectsOperations.getProjectById(projectId));
  }, [dispatch, projectId]);

  // ======= useMediaQuery =======
  const handleMaxWidth = width => {
    return `(max-width:${width}px) `;
  };
  const handleMinWidth = width => {
    return `(min-width:${width}px) `;
  };
  const tablet = useMediaQuery(handleMinWidth(refs.tablet));
  const tabletMax = useMediaQuery(handleMaxWidth(refs.tabletMax));
  const desktop = useMediaQuery(handleMinWidth(refs.desktop));
  // ======= End useMediaQuery =======

  return (
    <>
      <main>
        <aside>
          <SideBar>
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

            {tablet && (
              <div className={s.CreateNewProjectWrap}>
                <CreateNewProject
                  className={s.CreateNewProject}
                  onClick={() => toggleModal('createProject')}
                />
                <span>Create a project</span>
              </div>
            )}
          </SideBar>
        </aside>

        <article>
          <div className={s.headerWrap}>
            <div className={s.contentWrap}>
              <div className={s.titleWrap}>
                <h2>{currentProject?.name || 'Project 1'}</h2>
                <EditIcon className={s.EditIcon} />
              </div>

              <p>
                {currentProject?.description ||
                  'Short description of the project, if it exist, it is posted here. The width of the text block'}
              </p>

              <div className={s.addWrap}>
                <AddGroupIcon className={s.AddGroupIcon} />
                <span onClick={() => toggleModal('addPeople')}>Add people</span>
              </div>
            </div>

            {tabletMax && (
              <CreateNewSprint
                className={s.CreateNewSprintFixed}
                onClick={() => toggleModal('createSprint')}
              />
            )}
            {tablet && (
              <div className={s.createSprintWrap}>
                {tablet && (
                  <CreateNewSprint
                    className={s.CreateNewSprint}
                    onClick={() => toggleModal('createSprint')}
                  />
                )}
                {desktop && <span>Create a sprint</span>}
              </div>
            )}
          </div>

          <SprintList currentProject={currentProject} />
        </article>
      </main>

      {showModal && (
        <Modal onCloseModal={toggleModal}>
          {el === 'createSprint' ? (
            <CreateSprint onClickCancel={toggleModal} projectId={projectId} />
          ) : el === 'addPeople' ? (
            <AddPeopleForm onClickCancel={toggleModal} projectId={projectId} />
          ) : (
            'Put here your CreateProject Component'
          )}
        </Modal>
      )}
    </>
  );
};

export default SprintsPage;

/*
const [showModalAddPeople, setShowModalAddPeople] = useState(false);
const [showModalCreateSprint, setShowModalCreateSprint] = useState(false);


const openModalAddPeople = () => setShowModalAddPeople(true);
const openModalCreateSprint = () => setShowModalCreateSprint(true);
const handleCloseModal = () => {
  setShowModalAddPeople(false);
  setShowModalCreateSprint(false);
};

<span onClick={openModalAddPeople}>Add people</span>

onClick={openModalCreateSprint}
onClick={openModalCreateSprint}

{showModalAddPeople && (
  <Modal onCloseModal={handleCloseModal}>
    <AddPeopleForm onClickCancel={handleCloseModal} />
  </Modal>
)}

{showModalCreateSprint && (
  <Modal onCloseModal={handleCloseModal}>
    <CreateSprint onClickCancel={handleCloseModal} />
  </Modal>
)} 
*/
