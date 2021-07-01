import { ClockLoader } from 'react-spinners';

const Spinner = () => {
  const override = `
  display: block;
  margin: 0 auto;
  margin-top: 20vh;
  `;
  return (
    <ClockLoader
      css={override}
      size={60}
      color={'#ff6b08'}
      speedMultiplier="1"
    />
  );
};

export default Spinner;
