// import styles from './TeamCard.module.scss';

const TeamCard = ({ team }) => {
  return (
    <div>
      <h3>{team.name}</h3>
      <img src="" alt="" />
      <a href={team.linkedin}>linkedin</a>
      <a href={team.github}>github</a>
      <p> {team.doing}</p>
    </div>
  );
};

export default TeamCard;
