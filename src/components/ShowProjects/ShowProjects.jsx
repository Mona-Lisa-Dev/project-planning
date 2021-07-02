import { Link } from 'react-router-dom';
import { ReactComponent as Arrow } from './arrow.svg';
import s from './ShowProjects.module.scss';

const ShowProjects = () => {
  return (
    <Link
      className={s.showProjectsLink}
      to={{
        pathname: `/projects`,
      }}
    >
      <Arrow className={s.Arrow} />
      <span>Show projects</span>
    </Link>
  );
};

export default ShowProjects;
