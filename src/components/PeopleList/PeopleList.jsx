import PropTypes from 'prop-types';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { useDispatch } from 'react-redux';

import projectsOperations from 'redux/projects/projects-operations';

import s from './PeopleList.module.scss';

const PeopleList = ({ projectId, participants }) => {
  const dispatch = useDispatch();

  const handleClick = item =>
    dispatch(projectsOperations.deleteParticipant(projectId, item));

  return (
    <ul>
      {participants.map(item => (
        <li className={s.participant} key={item}>
          {item}{' '}
          <button
            type="button"
            onClick={() => handleClick(item)}
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
