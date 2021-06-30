import { useState } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { refs } from './refs';
import { ReactComponent as EditIcon } from './svg/edit_icon.svg';
import { ReactComponent as AddGroupIcon } from './svg/add_group_icon.svg';
import { ReactComponent as PlusButtonIcon } from './svg/plus_button_icon.svg';
import SideBar from 'components/SideBar';
import Modal from 'components/Modal';
import CreateSprint from 'components/CreateSprint';
import s from './SprintsPage.module.scss';

const SprintsPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleMaxWidth = width => {
    return `(max-width:${width}px) `;
  };

  const handleMinWidth = width => {
    return `(min-width:${width}px) `;
  };

  const tablet = useMediaQuery(handleMinWidth(refs.tablet));
  const tabletMax = useMediaQuery(handleMaxWidth(refs.tabletMax));
  const desktop = useMediaQuery(handleMinWidth(refs.desktop));

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <main>
        <aside>
          <SideBar>
            <div className={s.sideBarPlug}>
              <p>SideBar content</p>
            </div>
          </SideBar>
        </aside>

        <article>
          <div className={s.headerWrap}>
            <div className={s.contentWrap}>
              <div className={s.titleWrap}>
                <h2>Project 1</h2>
                <EditIcon className={s.EditIcon} />
              </div>
              <p>
                Short description of the project, if it exist, it is posted
                here. The width of the text block
              </p>
              <div className={s.addWrap}>
                <AddGroupIcon className={s.AddGroupIcon} />
                <span onClick={toggleModal}>Add people</span>
              </div>
            </div>
            {tabletMax && (
              <PlusButtonIcon
                className={s.PlusButtonIconFixed}
                onClick={toggleModal}
              />
            )}
            {tablet && (
              <div className={s.createSprintWrap}>
                {tablet && (
                  <PlusButtonIcon
                    className={s.PlusButtonIcon}
                    onClick={toggleModal}
                  />
                )}
                {desktop && <span>Create a sprint</span>}
              </div>
            )}
          </div>

          <ul className={s.SprintList}>
            <li className={s.SprintItem}></li>
            <li className={s.SprintItem}></li>
            <li className={s.SprintItem}></li>
            <li className={s.SprintItem}></li>
            <li className={s.SprintItem}></li>
            <li className={s.SprintItem}></li>
            <li className={s.SprintItem}></li>
          </ul>
        </article>
      </main>

      {showModal && (
        <Modal onCloseModal={toggleModal}>
          <CreateSprint />
        </Modal>
      )}
    </>
  );
};

export default SprintsPage;
