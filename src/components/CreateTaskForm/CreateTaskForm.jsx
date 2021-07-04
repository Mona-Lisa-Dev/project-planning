import { useState } from 'react';
import { useDispatch } from 'react-redux';
import tasksOperations from 'redux/tasks/tasks-operations';
import s from './CreateTaskForm.module.scss';

const CreateTaskForm = ({ projectId, sprintId, onClickCancel }) => {
  const [task, setTask] = useState('');
  const [hours, setHours] = useState('');
  const [emptyInput, setEmptyInput] = useState(false);

  const dispatch = useDispatch();

  const handleChangeTask = e => {
    setTask(e.target.value);
  };

  const handleChangeHours = e => {
    setHours(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // если пустой инпут, подсвечиваем красным
    if (!task || !hours) {
      setEmptyInput(true);
      return;
    }
    // если ввели значения, добавляем таск в стейт
    const newTask = {
      // пока нет базы, использую uuid
      name: task,
      scheduledTime: hours,
    };

    // здесь будет отправка на бек
    dispatch(tasksOperations.createTask(projectId, sprintId, { newTask }));
    onClickCancel();

    setTask('');
    setHours('');
    setEmptyInput(false);
  };

  return (
    <div className={s.form}>
      <h2 className={s.title}>Creating a task</h2>
      <form id="add" onSubmit={handleSubmit}>
        <label htmlFor={task}>
          <input
            id={task}
            value={task}
            type="text"
            name="task"
            placeholder={emptyInput ? 'Enter task name' : 'Task name'}
            className={emptyInput ? s.empty_input : s.input}
            onChange={handleChangeTask}
          />
        </label>
        <label htmlFor={hours}>
          <input
            id={hours}
            value={hours}
            type="number"
            name="hours"
            placeholder={
              emptyInput ? 'Enter scheduled hours' : 'Scheduled hours'
            }
            className={
              emptyInput
                ? [s['empty_input'], s['schedule']].join(' ')
                : [s['input'], s['schedule']].join(' ')
            }
            onChange={handleChangeHours}
          />
        </label>
      </form>

      {/* при клике будет отправляться запрос на бек */}
      <button form="add" type="submit" className={s.ready_btn}>
        Ready
      </button>
      {/* закрытие реализуется на модалке */}
      <button
        onClick={onClickCancel}
        form="add"
        type="button"
        className={s.cancel_btn}
      >
        Cancel
      </button>
    </div>
  );
};

export default CreateTaskForm;
