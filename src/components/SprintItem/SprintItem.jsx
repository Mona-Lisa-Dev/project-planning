// import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import sprintsOperations from 'redux/sprints/sprints-operations';
import ButtonDelete from '../ButtonDelete';
import styles from './SprintItem.module.scss';

const SprintItem = ({ currentProject, sprint }) => {
  const dispatch = useDispatch();

  const handleClick = () =>
    dispatch(sprintsOperations.deleteSprint(currentProject.id, sprint.id));

  return (
    <>
      <div className={styles.item_one}>
        <h3 className={styles.item_header}>{sprint.name}</h3>
        <div className={styles.item_info}>
          <div className={styles.item_left}>
            <p className={styles.item_description}>Дата початку</p>
            <p className={styles.item_description}>Дата закінчення</p>
            <p className={styles.item_description}>Тривалість</p>
          </div>
          <div className={styles.item_right}>
            <p className={styles.item_description}>{sprint.startDate}</p>
            <p className={styles.item_description}>{sprint.endDate}</p>
            <p className={styles.item_description}>{sprint.duration}</p>
          </div>
        </div>
        <ButtonDelete handleClick={handleClick} />
      </div>
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
