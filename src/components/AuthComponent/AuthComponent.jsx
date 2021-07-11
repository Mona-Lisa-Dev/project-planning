import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authOperations from 'redux/auth/auth-operations';
import Loader from 'components/Loader';

const AuthComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(authOperations.getUserByGoogleAuth()), [dispatch]);
  return <Loader />;
};

export default AuthComponent;
