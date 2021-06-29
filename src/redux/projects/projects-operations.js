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
  updateProjectRequest,
  updateProjectSuccess,
  updateProjectError,
  addParticipantRequest,
  addParticipantSuccess,
  addParticipantError,
  deleteParticipantRequest,
  deleteParticipantSuccess,
  deleteParticipantError,
} from './projects-actions';

const getAllProjects = () => async dispatch => {
  dispatch(getAllProjectsRequest());

  try {
    const {
      data: { data },
    } = await axios.get('/projects');
    dispatch(getAllProjectsSuccess(data.projects));

    return data.projects;
  } catch (error) {
    dispatch(getAllProjectsError(error.message));
  }
};

const createProject = project => async dispatch => {
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

const updateProject = (projectId, updatedProject) => async dispatch => {
  dispatch(updateProjectRequest());

  try {
    const {
      data: { data },
    } = await axios.patch(`/projects/${projectId}/name`, updatedProject);
    dispatch(updateProjectSuccess(data.project));

    return data.project;
  } catch (error) {
    dispatch(updateProjectError(error.message));
  }
};

const addParticipant = (projectId, updatedProject) => async dispatch => {
  dispatch(addParticipantRequest());

  try {
    const {
      data: { data },
    } = await axios.patch(`/projects/${projectId}/participant`, updatedProject);
    dispatch(addParticipantSuccess(data.project));

    return data.project;
  } catch (error) {
    dispatch(addParticipantError(error.message));
  }
};

const deleteParticipant = (projectId, email) => async dispatch => {
  dispatch(deleteParticipantRequest());

  try {
    const {
      data: { data },
    } = await axios.delete(`/projects/${projectId}/participant`, email);
    dispatch(deleteParticipantSuccess(data.project));

    return data.project;
  } catch (error) {
    dispatch(deleteParticipantError(error.message));
  }
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getAllProjects,
  createProject,
  deleteProject,
  updateProject,
  addParticipant,
  deleteParticipant,
};
