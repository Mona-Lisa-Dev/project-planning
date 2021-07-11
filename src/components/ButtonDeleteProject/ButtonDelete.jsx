import styles from './ButtonDelete.module.scss';

const ButtonDelete = ({ handleClick }) => {
  return (
    <button
      type="button"
      onClick={() => handleClick()}
      className={styles.btnDelete}
    ></button>
  );
};

export default ButtonDelete;
