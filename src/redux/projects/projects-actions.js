import { createAction } from '@reduxjs/toolkit';

export const getAllProjectsRequest = createAction(
  'projects/getAllProjectsRequest',
);
export const getAllProjectsSuccess = createAction(
  'projects/getAllProjectsSuccess',
);
export const getAllProjectsError = createAction('projects/getAllProjectsError');

export const createProjectRequest = createAction(
  'projects/createProjectRequest',
);
export const createProjectSuccess = createAction(
  'projects/createProjectSuccess',
);
export const createProjectError = createAction('projects/createProjectError');

export const deleteProjectRequest = createAction(
  'projects/deleteProjectRequest',
);
export const deleteProjectSuccess = createAction(
  'projects/deleteProjectSuccess',
);
export const deleteProjectError = createAction('projects/deleteProjectError');

export const updateProjectNameRequest = createAction(
  'projects/updateProjectNameRequest',
);
export const updateProjectNameSuccess = createAction(
  'projects/updateProjectNameSuccess',
);
export const updateProjectNameError = createAction(
  'projects/updateProjectNameError',
);

export const addParticipantRequest = createAction(
  'projects/addParticipantRequest',
);
export const addParticipantSuccess = createAction(
  'projects/addParticipantSuccess',
);
export const addParticipantError = createAction('projects/addParticipantError');
