import React from 'react';
import styles from './SprintItem.module.scss';
import PropTypes from 'prop-types';
// import ButtonDelete from '../ButtonDelete';

const SprintItem = ({ name, startDate, endDate, duration }) => {
  return (
    <>
      <div className={styles.item_one}>
        <h3 className={styles.item_header}>{name}</h3>
        <div className={styles.item_info}>
          <div className={styles.item_left}>
            <p className={styles.item_description}>Дата початку</p>
            <p className={styles.item_description}>Дата закінчення</p>
            <p className={styles.item_description}>Тривалість</p>
          </div>
          <div className={styles.item_right}>
            <p className={styles.item_description}>{startDate}</p>
            <p className={styles.item_description}>{endDate}</p>
            <p className={styles.item_description}>{duration}</p>
          </div>
        </div>
        {/* <ButtonDelete /> */}
      </div>
    </>
  );
};

export default SprintItem;

SprintItem.propTypes = {
  name: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
};
