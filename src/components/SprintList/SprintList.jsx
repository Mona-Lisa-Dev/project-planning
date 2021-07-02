import { useSelector } from 'react-redux';

import SprintItem from '../SprintItem';
import { getSprints } from 'redux/sprints/sprints-selectors';

import styles from './SprintList.module.scss';

const SprintList = ({ currentProject }) => {
  const sprints = useSelector(getSprints);

  return (
    <ul className={styles.listWrapper}>
      {sprints.map(sprint => (
        <li key={sprint.id} className={styles.listItem}>
          <SprintItem currentProject={currentProject} sprint={sprint} />
        </li>
      ))}
    </ul>
  );
};

export default SprintList;
