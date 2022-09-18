import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const fetchCurrentUser = () => {
  console.log('fetching user');
  return axios.get('/api/users/currentuser');
};

const registerUser = (data) => {
  console.log('registering user');
  return axios.post('/api/users/signup', data);
};

const loginUser = (data) => {
  console.log('login user');
  return axios.post('/api/users/signin', data);
};

const logoutUser = () => {
  console.log('fetching user');
  return axios.post('/api/users/signout');
};

export const useCurrentUser = (config) => {
  return useQuery('current-user', fetchCurrentUser, config);
};

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  return useMutation(registerUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('current-user');
    },
  });
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  return useMutation(loginUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('current-user');
    },
  });
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  return useMutation(logoutUser);
};
