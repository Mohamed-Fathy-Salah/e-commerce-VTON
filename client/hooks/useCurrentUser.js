import axios from 'axios';
import { useQuery } from 'react-query';

const fetchCurrentUser = () => {
  return axios.get('/api/users/currentuser');
};

export const useCurrentUser = (config) => {
  return useQuery('current-user', fetchCurrentUser, config);
};
