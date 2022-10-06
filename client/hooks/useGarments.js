import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const fetchGarments = () => {
  console.log('fetching all garments');
  return axios.get(`/api/garments`);
};

const fetchAdminGarments = (adminId) => {
  console.log('fetching admin garments');
  return axios.get(`/api/garments/admin/${adminId}`);
};

const fetchCartGarments = () => {
  console.log('fetching cart garments');
  return axios.get(`/api/garments?cart=1`);
};

const fetchGarmentById = (garmentId) => {
  console.log('fetching garment by id');
  return axios.get(`/api/garments/garment/${garmentId}`);
};

const createNewGarment = (data) => {
  console.log('adding new garment');
  return axios.post('/api/garments', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  });
};

const editGarment = (garmentId, data) => {
  console.log('create new order');
  return axios.put(`/api/garments/${garmentId}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  });
};

const deleteGarment = (garmentId) => {
  console.log('delete garment');
  return axios.delete(`/api/garments/${garmentId}`);
};

export const useGarments = () => {
  return useQuery('garments', fetchGarments);
};

export const useAdminGarments = (adminId) => {
  return useQuery('admin-garments', () => fetchAdminGarments(adminId));
};

export const useCartGarments = () => {
  return useQuery('cart-garments', fetchCartGarments, {
    enabled: false,
  });
};

export const useGarmentById = (garmentId) => {
  return useQuery('garment', () => fetchGarmentById(garmentId));
};

export const useNewGarment = () => {
  const queryClient = useQueryClient();
  return useMutation(createNewGarment, {
    onSuccess: () => {
      queryClient.invalidateQueries('admin-garments');
      queryClient.invalidateQueries('garments');
    },
  });
};

export const useDeleteGarment = (garmentId) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteGarment(garmentId), {
    onSuccess: () => {
      queryClient.invalidateQueries('admin-garments');
      queryClient.invalidateQueries('garments');
    },
  });
};

export const useUpdateGarment = (garmentId) => {
  const queryClient = useQueryClient();
  return useMutation(() => editGarment(garmentId), {
    onSuccess: () => {
      queryClient.invalidateQueries('admin-garments');
      queryClient.invalidateQueries('garments');
    },
  });
};
