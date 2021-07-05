import styles from './TeamCard.module.scss';

const TeamCard = ({ team }) => {
  return (
    <div className={styles.card}>
      <img src="" alt="" className={styles.photo} />
      <h3 className={styles.name}>{team.name}</h3>
      <p className={styles.doing}> {team.doing}</p>
      <a href={team.linkedin} className={styles.links}>
        linkedin
      </a>
      <a href={team.github} className={styles.links}>
        github
      </a>
    </div>
  );
};

export default TeamCard;
