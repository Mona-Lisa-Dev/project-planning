// import { Button, TextField } from '@material-ui/core';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import s from './AddPeopleForm.module.scss';
import PeopleList from 'components/PeopleList';

const AddPeopleForm = ({ onClickCancel }) => {
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [emptyInput, setEmptyInput] = useState(false);

  // const dispatch = useDispatch();

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
    // если ввели имейл, добавляем юзера в список
    const user = {
      // пока нет базы, использую uuid
      id: uuidv4(),
      email,
    };
    setUsers(prevState => [user, ...prevState]);

    // здесь будет отправка на бек
    // dispatch(addContact({ name, number }));

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
