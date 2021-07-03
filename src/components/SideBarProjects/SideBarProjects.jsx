import { useMediaQuery } from '@material-ui/core';
import { refs } from '../../pages/SprintsPage/refs';

import { Link, withRouter } from 'react-router-dom';
import Violet from './img/violet-8C72DF.png';
import Orange from './img/orange-FF765F.png';
import Green from './img/green-71DF87.png';
import s from './SideBarProjects.module.scss';

const SideBarProjects = ({ projects, match }) => {
  const { projectId } = match.params;

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
          {projects.map(project => (
            <li key={project.id}>
              <Link
                to={{
                  pathname: `/projects/${project.id}`,
                }}
              >
                {projectId === String(project.id) ? (
                  <div className={s.activeProjectNameWrap}>
                    <span style={{ backgroundColor: `#${project.color}` }} />
                    {project.color === '8C72DF' ? (
                      <img src={Violet} alt="dd" />
                    ) : project.color === 'FF765F' ? (
                      <img src={Orange} alt="dd" />
                    ) : (
                      <img src={Green} alt="dd" />
                    )}
                    <h3>{project.name}</h3>
                  </div>
                ) : (
                  <div className={s.projectNameWrap}>
                    <span style={{ backgroundColor: `#${project.color}` }} />
                    <h3>{project.name}</h3>
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default withRouter(SideBarProjects);
