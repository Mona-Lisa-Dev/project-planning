import axios from 'axios';

import {
  getAllProjectsRequest,
  getAllProjectsSuccess,
  getAllProjectsError,
  createProjectRequest,
  createProjectSuccess,
  createProjectError,
  deleteProjectRequest,
  deleteProjectSuccess,
  deleteProjectError,
  updateProjectNameRequest,
  updateProjectNameSuccess,
  updateProjectNameError,
  addParticipantRequest,
  addParticipantSuccess,
  addParticipantError,
} from './projects-actions';

const getAllProjects = () => async dispatch => {
  dispatch(getAllProjectsRequest());

  try {
    const {
      data: { data },
    } = await axios.get('/projects');
    dispatch(getAllProjectsSuccess(data));

    return data;
  } catch (error) {
    dispatch(getAllProjectsError(error.message));
  }
};

const createProject = (name, description) => async dispatch => {
  const project = { name, description };

  dispatch(createProjectRequest());

  try {
    const {
      data: { data },
    } = await axios.post('/projects', project);
    dispatch(createProjectSuccess(data.project));

    return data.project;
  } catch (error) {
    dispatch(createProjectError(error.message));
  }
};

const deleteProject = projectId => async dispatch => {
  dispatch(deleteProjectRequest());

  try {
    const {
      data: { data },
    } = await axios.delete(`/projects/${projectId}`);
    dispatch(deleteProjectSuccess(projectId));

    return data.projects;
  } catch (error) {
    dispatch(deleteProjectError(error.message));
  }
};

const updateProjectName = () => async dispatch => {
  try {
  } catch (error) {}
};

const addParticipant = () => async dispatch => {
  try {
  } catch (error) {}
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getAllProjects,
  createProject,
  deleteProject,
  updateProjectName,
  addParticipant,
};
