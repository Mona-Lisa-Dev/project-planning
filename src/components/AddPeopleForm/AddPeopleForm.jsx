// import { Button, TextField } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import { getParticipants } from 'redux/projects/projects-selectors';
import projectsOperations from 'redux/projects/projects-operations';
import PeopleList from 'components/PeopleList';
import swal from 'sweetalert';

import s from './AddPeopleForm.module.scss';

const AddPeopleForm = ({ onClickCancel, projectId }) => {
  const [email, setEmail] = useState('');
  // const [users, setUsers] = useState([]);
  const [emptyInput, setEmptyInput] = useState(false);
  const participants = useSelector(getParticipants);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(projectsOperations.getAllParticipants(projectId));
  }, [dispatch, projectId]);

  const handleChange = e => {
    setEmail(e.target.value);
  };

  const handleClick = email => {
    dispatch(projectsOperations.deleteParticipant(projectId, { email }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // если нет имейла, подсвечиваем инпут красным
    if (!email) {
      setEmptyInput(true);
      return;
    }

    const normalizedName = email.toLowerCase().trim();
    const isExistingUser = participants.find(
      el => el.toLowerCase() === normalizedName,
    );

    if (isExistingUser) {
      swal('Warning!', `${email} is already in Participants!`, 'warning');
      return;
    }
    const participant = {
      email,
    };
    // setUsers(prevState => [participant, ...prevState]);

    dispatch(projectsOperations.addParticipant(projectId, participant));

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

      {participants.length === 0 ? (
        <div>
          <p className={s.text}>Added users:</p>
          <p>You have not added any users yet</p>
        </div>
      ) : (
        <div>
          <p className={s.text}>
            There are {participants.length} participants in project now:
          </p>

          <ul>
            {participants.map(item => (
              <li className={s.participant} key={item}>
                {item}{' '}
                <button
                  type="button"
                  onClick={() => handleClick(item)}
                  className={s.deleteButton}
                >
                  <DeleteOutlinedIcon />
                </button>
              </li>
            ))}
          </ul>

          {/* <PeopleList projectId={projectId} participants={participants} /> */}
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
