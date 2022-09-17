import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useCurrentUser } from '../hooks/useCurrentUser';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const onFetchUserSuccess = (data) => {
    setUser(data.data.currentUser);
  };
  const {
    isLoading,
    data,
    error: fetchUserError,
    refetch: refetchUser,
  } = useCurrentUser({ enabled: false, onSuccess: onFetchUserSuccess });

  useEffect(() => {
    refetchUser();
  }, []);

  const register = async (user) => {
    try {
      const res = await axios.post('/api/users/signup', user);
      refetchUser();
      setError(null);
      router.push('/');
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

  const login = async (user) => {
    try {
      const res = await axios.post('/api/users/signin', user);
      refetchUser();
      setError(null);
      router.push('/');
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

  const logout = async () => {
    const res = await axios.post('/api/users/signout');
    setUser(null);
    router.push('/');
  };

  //   const getUser = async () => {
  //     const { data } = await axios.get('/api/users/currentuser');

  //     if (data) {
  //       setUser(data.currentUser);
  //     }
  //   };

  return (
    <AuthContext.Provider
      value={{ isLoading, user, error, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
