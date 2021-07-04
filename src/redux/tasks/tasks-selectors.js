export const getTasks = state => state.tasks.items;
export const getCurrentTask = state => state.tasks.currentTask;
export const getFilter = state => state.tasks.filter;
export const getLoadingTasks = state => state.tasks.loading;
export const getError = state => state.tasks.error;

export const getVisibleTasks = state => {
  const items = getTasks(state);
  const filter = getFilter(state);
  const normalizedFilter = filter.toLowerCase();

  return items.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter),
  );
};
