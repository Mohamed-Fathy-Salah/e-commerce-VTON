import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import {
  useCurrentUser,
  useLoginUser,
  useLogoutUser,
  useRegisterUser,
} from '../hooks/useCurrentUser';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    refetchUser();
  }, []);

  const onFetchUserSuccess = (data) => {
    if (data) setUser(data?.data.currentUser);
  };

  const { isLoading, refetch: refetchUser } = useCurrentUser({
    onSuccess: onFetchUserSuccess,
  });

  const { mutate: registerUser } = useRegisterUser();
  const { mutate: loginUser } = useLoginUser();
  const { mutate: logoutUser } = useLogoutUser();

  const register = (user) => {
    try {
      registerUser(user);
      setError(null);
    } catch (err) {
      setError(
        <div className=''>
          <ul className='my-0'>
            {err.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  const login = (user) => {
    try {
      loginUser(user);
      setError(null);
    } catch (err) {
      setError(
        <div className=''>
          <ul className='my-0'>
            {err.response?.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{ isLoading, user, error, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
