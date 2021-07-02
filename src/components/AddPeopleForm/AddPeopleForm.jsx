// import { Button, TextField } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import projectsOperations from 'redux/projects/projects-operations';
import PeopleList from 'components/PeopleList';

import s from './AddPeopleForm.module.scss';

const AddPeopleForm = ({ onClickCancel, projectId }) => {
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [emptyInput, setEmptyInput] = useState(false);

  const dispatch = useDispatch();

  const handleChange = e => {
    setEmail(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // если нет имейла, подсвечиваем инпут красным
    if (!email) {
      setEmptyInput(true);
      return;
    }

    const user = {
      email,
    };
    setUsers(prevState => [user, ...prevState]);

    // здесь будет отправка на бек
    dispatch(projectsOperations.addParticipant(projectId, user));

    setEmail('');
    setEmptyInput(false);
  };

  return (
    <div className={s.form}>
      <h2 className={s.title}>Add people</h2>
      <form id="add" onSubmit={handleSubmit}>
        <label htmlFor={email}>
          <input
            // required
            id={email}
            value={email}
            type="email"
            name="email"
            autoComplete="current-email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            placeholder="Enter e-mail"
            className={emptyInput ? s.empty_input : s.input}
            onChange={handleChange}
          />
        </label>
      </form>

      {users.length === 0 ? (
        <div>
          <p className={s.text}>Added users:</p>
          <p>You have not added any users yet</p>
        </div>
      ) : (
        <div>
          <p className={s.text}>
            There are {users.length} participants in project now:
          </p>
          <PeopleList users={users} />
        </div>
      )}

      {/* при клике на кнопку готово форма не закрывается, а добавляется введенный имейл в список ниже */}
      <button form="add" type="submit" className={s.ready_btn}>
        Ready
      </button>
      {/* закрытие реализуется на модалке */}
      <button
        form="add"
        type="button"
        onClick={onClickCancel}
        className={s.cancel_btn}
      >
        Cancel
      </button>
    </div>
  );
};

export default AddPeopleForm;
