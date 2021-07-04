import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.Footer}>
      <span className={styles.Footer_text}>
        © 2021 | All Rights Reserved | Developed by
      </span>
      {/* <здесь будет открытие модалки, пока я обернула в span */}
      <span className={styles.Footer_link}> GoIT Students</span>
    </footer>
  );
}
