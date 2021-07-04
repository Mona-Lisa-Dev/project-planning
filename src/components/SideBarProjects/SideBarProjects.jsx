import { useMediaQuery } from '@material-ui/core';
import { refs } from '../../pages/SprintsPage/refs';

import { NavLink, withRouter } from 'react-router-dom';
// import Violet from './img/violet-8C72DF.png';
// import Orange from './img/orange-FF765F.png';
// import Green from './img/green-71DF87.png';
import s from './SideBarProjects.module.scss';

const SideBarProjects = ({ projects, match }) => {
  // ------- useMediaQuery -------
  const handleMinWidth = width => {
    return `(min-width:${width}px) `;
  };
  const tablet = useMediaQuery(handleMinWidth(refs.tablet));
  // ----- End useMediaQuery -----

  // const { projectId } = match.params;
  // console.log('projectId', projectId);

  return (
    <>
      {tablet && (
        <ul className={s.SideBarProjectsList}>
          {projects.map(project => (
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
                {/* {projectId === String(project.id) ? (
                  <div>
                    <span className={s.square} />
                    <h3 className={s.name}>{project.name}</h3>
                  </div>
                ) : (
                  <div>
                    <span className={s.square} />
                    <h3 className={s.name}>{project.name}</h3>
                  </div>
                )} */}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default withRouter(SideBarProjects);
