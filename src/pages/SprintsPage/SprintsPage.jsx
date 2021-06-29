import { useState } from 'react';
import { ReactComponent as EditIcon } from './svg/edit_icon.svg';
import { ReactComponent as AddGroupIcon } from './svg/add_group_icon.svg';
import { ReactComponent as PlusButtonIcon } from './svg/plus_button_icon.svg';
import Modal from 'components/Modal';
import s from './SprintsPage.module.scss';

const SprintsPage = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <main>
        <aside>
          <button type="button" onClick={toggleModal}>
            Open modal
          </button>
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
                <a href="/">Add people</a>
              </div>
            </div>
            <div className={s.createSprint}>
              <PlusButtonIcon
                className={s.PlusButtonIcon}
                onClick={toggleModal}
              />
              Create a sprint
            </div>
          </div>
          <ul className={s.SprintList}>
            <li className={s.SprintItem}></li>
            <li className={s.SprintItem}></li>
            <li className={s.SprintItem}></li>
            <li className={s.SprintItem}></li>
          </ul>
        </article>
      </main>

      {showModal && (
        <Modal onCloseModal={toggleModal}>
          <div className={s.modalPlug}>
            <h2>Modal content</h2>
          </div>
        </Modal>
      )}
    </>
  );
};

export default SprintsPage;
