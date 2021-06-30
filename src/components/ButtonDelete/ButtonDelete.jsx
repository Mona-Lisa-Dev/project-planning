import styles from './ButtonDelete.module.scss';

const ButtonDelete = ({ handleClick }) => {
  return (
    <button
      type="button"
      className={styles.btnDelete}
      onClick={() => handleClick()}
    ></button>
  );
};

export default ButtonDelete;
