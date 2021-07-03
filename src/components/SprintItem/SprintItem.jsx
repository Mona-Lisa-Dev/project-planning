// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import sprintsOperations from 'redux/sprints/sprints-operations';
import ButtonDelete from '../ButtonDelete';
import styles from './SprintItem.module.scss';

const SprintItem = ({ currentProject, sprint }) => {
  const dispatch = useDispatch();

  console.log('currentProject', currentProject);
  console.log('sprint', sprint);

  const handleClick = () =>
    dispatch(sprintsOperations.deleteSprint(currentProject.id, sprint.id));

  return (
    <>
      <Link
        to={{
          pathname: `/projects/${sprint.project}/${sprint.id}`,
        }}
      >
        <div className={styles.itemWrap}>
          <h3>{sprint.name}</h3>

          <ul>
            <li>
              <span>Start date</span>
              <span>{sprint.startDate}</span>
            </li>
            <li>
              <span>End date</span>
              <span>{sprint.endDate}</span>
            </li>
            <li>
              <span>Duration</span>
              <span>{sprint.duration}</span>
            </li>
          </ul>
        </div>
      </Link>
      <ButtonDelete handleClick={handleClick} />
    </>
  );
};

export default SprintItem;

// SprintItem.propTypes = {
//   name: PropTypes.string.isRequired,
//   startDate: PropTypes.string.isRequired,
//   endDate: PropTypes.string.isRequired,
//   duration: PropTypes.number.isRequired,
// };
