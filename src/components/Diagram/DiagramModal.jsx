import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import Diagram from './Diagram';
import ButtonClose from 'components/ButtonClose';
import s from './Diagram.module.scss';

const modalRoot = document.querySelector('#modal-root');

const DiagramModal = ({ onCloseModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleCloseByEsc);

    return () => {
      window.removeEventListener('keydown', handleCloseByEsc);
    };
  });

  // Close by backdrop
  const handleCloseByBackdrop = e =>
    e.currentTarget === e.target && onCloseModal();

  // Close by ESC
  const handleCloseByEsc = e => e.code === 'Escape' && onCloseModal();

  // Close by click on btn
  const handleCloseByButton = () => onCloseModal();

  return createPortal(
    <div className={s.backdrop} onClick={handleCloseByBackdrop}>
      <div className={s.content}>
        <ButtonClose onClose={handleCloseByButton} />
        <Diagram />
      </div>
    </div>,
    modalRoot,
  );
};

DiagramModal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};

export default DiagramModal;
