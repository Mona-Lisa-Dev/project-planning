import { useMediaQuery } from '@material-ui/core';
import { refs } from '../../pages/SprintsPage/refs';
import { NavLink, withRouter } from 'react-router-dom';
import s from './SideBarProjects.module.scss';

const SideBarProjects = ({ projects }) => {
  // ------- useMediaQuery -------
  const handleMinWidth = width => {
    return `(min-width:${width}px) `;
  };
  const tablet = useMediaQuery(handleMinWidth(refs.tablet));
  // ----- End useMediaQuery -----

  return (
    <>
      {tablet && (
        <ul className={s.SideBarProjectsList}>
          {projects?.map(project => (
            <li key={project.id}>
              <NavLink
                to={{
                  pathname: `/projects/${project.id}`,
                }}
                className={s.link}
                activeClassName={s.activeLink}
              >
                <span className={s.square} />
                <span className={s.squareShadow} />
                <h3 className={s.name}>{project.name}</h3>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default withRouter(SideBarProjects);
