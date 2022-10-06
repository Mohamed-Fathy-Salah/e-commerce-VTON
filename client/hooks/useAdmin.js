import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const fetchAdminData = (adminId) => {
  console.log('fetching admin data');
  return axios.get(`/api/admindata/data/${adminId}`);
};

const editAdminData = (data) => {
  console.log('editing admin data');
  return axios.put('/api/admindata', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  });
};

export const useAdminData = (adminId) => {
  return useQuery('admin-data', () => fetchAdminData(adminId));
};

export const useEditAdminData = () => {
  const queryClient = useQueryClient();
  return useMutation(editAdminData, {
    onSuccess: () => {
      queryClient.invalidateQueries('admin-data');
      queryClient.invalidateQueries('current-user');
    },
  });
};
