import { styled } from '@material-ui/styles';
import styles from './ButtonDelete.module.scss';

const ButtonDelete = ({ className, handleClick }) => {
  return (
    <button
      type="button"
      onClick={() => handleClick()}
      className={className ? styles.isHidden : styles.btnDelete}
    ></button>
  );
};

export default ButtonDelete;
