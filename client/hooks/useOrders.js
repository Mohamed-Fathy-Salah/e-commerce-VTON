import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const fetchAdminOrders = () => {
  console.log('fetching orders');
  return axios.get('/api/admindata/orders');
};

const fetchAdminOrderById = (orderId) => {
  console.log('fetching order by id');
  return axios.get(`/api/admindata/orders/${orderId}`);
};

const fetchCustomerOrderById = (orderId) => {
  console.log('fetching order by id');
  return axios.get(`/api/orders/${orderId}`);
};

const createNewOrder = (order) => {
  console.log('create new order');
  return axios.post('/api/orders', order);
};

const deleteOrder = (orderId) => {
  console.log('delete order');
  return axios.post(`/api/orders/${orderId}`);
};

export const useAdminOrders = () => {
  return useQuery('orders', fetchAdminOrders);
};

export const useAdminOrderById = (orderId) => {
  return useQuery('admin-order', () => fetchAdminOrderById(orderId));
};

export const useCustomerOrderById = (orderId) => {
  return useQuery('customer-order', () => fetchCustomerOrderById(orderId));
};

export const useNewOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(createNewOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries('orders');
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries('orders');
    },
  });
};
