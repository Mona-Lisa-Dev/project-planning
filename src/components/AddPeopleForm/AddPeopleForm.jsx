// import { Button, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { confirmAlert } from 'react-confirm-alert';

import * as projectsActions from 'redux/projects/projects-actions';
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

  console.log(typeof projectId);

  const dispatch = useDispatch();

  const handleChange = e => {
    setEmail(e.target.value);
  };

  const handleClick = async email => {
    await dispatch(projectsOperations.deleteParticipant(projectId, { email }));
    // await dispatch(projectsActions.clearState(email));
  };

  const onClick = item => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className={s.custom_ui}>
            <h1>Are you sure?</h1>
            <p>You want to delete participant?</p>
            <button className={s.cancelBtn} type="button" onClick={onClose}>
              Cancel
            </button>
            <button
              className={s.rdyBtn}
              type="button"
              onClick={() => {
                handleClick(item);
                onClose();
              }}
            >
              Ok
            </button>
          </div>
        );
      },
    });
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
                  onClick={() => onClick(item)}
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

      <button form="add" type="submit" className={s.ready_btn}>
        Ready
      </button>

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

AddPeopleForm.propTypes = {
  projectId: PropTypes.string.isRequired,
  onClickCancel: PropTypes.string.isRequired,
};

export default AddPeopleForm;
