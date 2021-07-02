import { useSelector } from 'react-redux';
import SprintItem from '../SprintItem';
import { getSprints } from 'redux/sprints/sprints-selectors';
import styles from './SprintList.module.scss';

const SprintList = ({ currentProject }) => {
  const sprints = useSelector(getSprints);

  // ====== Alternative sprints - Delete it later! ======
  // const sprints = [
  //   {
  //     id: 1,
  //     name: 'Sprint Burndown Chart One and loooooooong string :)',
  //     startDate: '10 Jul',
  //     endDate: '22 Jul',
  //     duration: 226,
  //   },
  //   {
  //     id: 2,
  //     name: 'Sprint Burndown Chart One Go :)',
  //     startDate: '10 Jul',
  //     endDate: '22 Jul',
  //     duration: 226,
  //   },
  //   {
  //     id: 3,
  //     name: 'Sprint Burndown Chart One Go :)',
  //     startDate: '10 Jul',
  //     endDate: '22 Jul',
  //     duration: 226,
  //   },
  //   {
  //     id: 4,
  //     name: 'Sprint Burndown Chart One Go :)',
  //     startDate: '10 Jul',
  //     endDate: '22 Jul',
  //     duration: 226,
  //   },
  //   {
  //     id: 5,
  //     name: 'Sprint Burndown Chart One Go :)',
  //     startDate: '10 Jul',
  //     endDate: '22 Jul',
  //     duration: 226,
  //   },
  //   {
  //     id: 6,
  //     name: 'Sprint Burndown Chart One Go :)',
  //     startDate: '10 Jul',
  //     endDate: '22 Jul',
  //     duration: 226,
  //   },
  //   {
  //     id: 7,
  //     name: 'Sprint Burndown Chart One Go :)',
  //     startDate: '10 Jul',
  //     endDate: '22 Jul',
  //     duration: 226,
  //   },
  // ];
  // ====== End Alternative sprints ======

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
