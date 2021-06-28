import React from 'react';
import styles from './SprintItem.module.scss';
// import ButtonDelete from '../ButtonDelete';

const SprintItem = ({ name, startDate, endDate, duration }) => {
  return (
    <>
      <div className={styles.item_one}>
        <h3 className={styles.item_header}>Name{name}</h3>
        <div className={styles.item_info}>
          <div className={styles.item_left}>
            <p className={styles.item_description}>Дата початку</p>
            <p className={styles.item_description}>Дата закінчення</p>
            <p className={styles.item_description}>Тривалість</p>
          </div>
          <div className={styles.item_right}>
            <p className={styles.item_description}>1{startDate}</p>
            <p className={styles.item_description}>1{endDate}</p>
            <p className={styles.item_description}>1{duration}</p>
          </div>
        </div>
        {/* <ButtonDelete /> */}
      </div>
    </>
  );
};

export default SprintItem;
