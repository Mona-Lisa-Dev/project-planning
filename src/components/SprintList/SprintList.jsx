import SprintItem from '../SprintItem';
import PropTypes from 'prop-types';
import styles from './SprintList.module.scss';

const SprintList = ({ sprints }) => {
  return (
    <ul className={styles.listWrapper}>
      {sprints.map(sprint => (
        <li key={sprint.id} className={styles.listItem}>
          <SprintItem sprint={sprint} />
        </li>
      ))}
    </ul>
  );
};

export default SprintList;

SprintList.propTypes = {
  sprints: PropTypes.array.isRequired,
};
