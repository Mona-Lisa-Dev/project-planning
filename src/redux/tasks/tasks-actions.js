import { createAction } from '@reduxjs/toolkit';

export const getAllTasksRequest = createAction('sprints/getAllTasksRequest');
export const getAllTasksSuccess = createAction('sprints/getAllTasksSuccess');
export const getAllTasksError = createAction('sprints/getAllTasksError');

export const createTaskRequest = createAction('sprints/createTaskRequest');
export const createTaskSuccess = createAction('sprints/createTaskSuccess');
export const createTaskError = createAction('sprints/createTaskError');

export const deleteTaskRequest = createAction('sprints/deleteTaskRequest');
export const deleteTaskSuccess = createAction('sprints/deleteTaskSuccess');
export const deleteTaskError = createAction('sprints/deleteTaskError');

export const updateTaskRequest = createAction('sprints/updateTaskRequest');
export const updateTaskSuccess = createAction('sprints/updateTaskSuccess');
export const updateTaskError = createAction('sprints/updateTaskError');

export const getTaskByIdRequest = createAction('sprints/getTaskByIdRequest');
export const getTaskByIdSuccess = createAction('sprints/getTaskByIdSuccess');
export const getTaskByIdError = createAction('sprints/getTaskByIdError');
