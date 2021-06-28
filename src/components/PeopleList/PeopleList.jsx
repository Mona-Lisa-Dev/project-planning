import PropTypes from 'prop-types';

const PeopleList = ({ users }) => {
  return (
    <ul>
      {users.map(({ id, email }) => (
        <li key={id}>{email}</li>
      ))}
    </ul>
  );
};

export default PeopleList;

PeopleList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
  ),
};
