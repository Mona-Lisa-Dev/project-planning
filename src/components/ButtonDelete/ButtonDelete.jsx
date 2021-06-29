import styles from './ButtonDelete.module.scss';

const ButtonDelete = ({ handleClick, id }) => {
  return (
    <button
      type="button"
      className={styles.btnDelete}
      onClick={() => handleClick(id)}
    ></button>
  );
};

export default ButtonDelete;
