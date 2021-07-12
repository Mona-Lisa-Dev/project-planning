import PropTypes from 'prop-types';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { useDispatch } from 'react-redux';

import { confirmAlert } from 'react-confirm-alert';

import projectsOperations from 'redux/projects/projects-operations';

import s from './PeopleList.module.scss';

const PeopleList = ({ projectId, participants }) => {
  const dispatch = useDispatch();

  const handleClick = item =>
    dispatch(projectsOperations.deleteParticipant(projectId, item));

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

  return (
    <ul>
      {participants.map(item => (
        <li className={s.participant} key={item}>
          {item}{' '}
          <button
            type="button"
            onClick={() => onClick(item)}
            className={s.editButton}
          >
            <DeleteOutlinedIcon />
          </button>
        </li>
      ))}
    </ul>
  );
};

PeopleList.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default PeopleList;
