import PropTypes from 'prop-types';

const PeopleList = ({ participants }) => {
  return (
    <ul>
      {participants.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

export default PeopleList;

PeopleList.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.string.isRequired),
};
