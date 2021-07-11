import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authOperations from 'redux/auth/auth-operations';

const AuthComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const authUser = await dispatch(authOperations.getUserByGoogleAuth());

      console.log('authUser', authUser.user);
    }
    fetchData();
  }, []);
  return <div>AuthComponent</div>;
};

export default AuthComponent;
