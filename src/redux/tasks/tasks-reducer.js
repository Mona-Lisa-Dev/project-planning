import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import {
  getAllTasksRequest,
  getAllTasksSuccess,
  getAllTasksError,
  createTaskRequest,
  createTaskSuccess,
  createTaskError,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskError,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskError,
  getTaskByIdRequest,
  getTaskByIdSuccess,
  getTaskByIdError,
  getTasksByDayRequest,
  getTasksByDaySuccess,
  getTasksByDayError,
} from './tasks-actions';

import { logoutSuccess } from 'redux/auth/auth-actions';

const tasksItems = createReducer([], {
  // [getAllTasksSuccess]: (_, { payload }) => payload,
  [createTaskSuccess]: (state, { payload }) => [...state, payload],
  [deleteTaskSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
  [updateTaskSuccess]: (state, { payload }) => [...state, payload],
  // state.map(item => (item.id === payload.id ? payload : item)),

  [getTasksByDaySuccess]: (_, { payload }) => payload,

  [logoutSuccess]: () => [],
});

const currentTask = createReducer(null, {
  [getTaskByIdSuccess]: (_, { payload }) => payload,
});

const loading = createReducer(false, {
  [getAllTasksRequest]: () => true,
  [getAllTasksSuccess]: () => false,
  [getAllTasksError]: () => false,
  [createTaskRequest]: () => true,
  [createTaskSuccess]: () => false,
  [createTaskError]: () => false,
  [deleteTaskRequest]: () => true,
  [deleteTaskSuccess]: () => false,
  [deleteTaskError]: () => false,
  [updateTaskRequest]: () => true,
  [updateTaskSuccess]: () => false,
  [updateTaskError]: () => false,
  [getTaskByIdRequest]: () => true,
  [getTaskByIdSuccess]: () => false,
  [getTaskByIdError]: () => false,
  [getTasksByDayRequest]: () => true,
  [getTasksByDaySuccess]: () => false,
  [getTasksByDayError]: () => false,
});

const error = createReducer(null, {
  [getAllTasksError]: (_, { payload }) => payload,
  [getAllTasksRequest]: () => null,
  [createTaskError]: (_, { payload }) => payload,
  [createTaskRequest]: () => null,
  [deleteTaskError]: (_, { payload }) => payload,
  [deleteTaskRequest]: () => null,
  [updateTaskError]: (_, { payload }) => payload,
  [updateTaskRequest]: () => null,
  [getTaskByIdError]: (_, { payload }) => payload,
  [getTaskByIdRequest]: () => null,
  [getTasksByDayError]: (_, { payload }) => payload,
  [getTasksByDayRequest]: () => null,
});

export default combineReducers({
  items: tasksItems,
  currentTask,
  loading,
  error,
});
