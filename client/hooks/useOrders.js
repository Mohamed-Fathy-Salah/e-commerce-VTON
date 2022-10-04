import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const fetchOrders = () => {
  console.log('fetching orders');
  return axios.get('/api/admindata/orders');
};

const fetchOrderById = (orderId) => {
  console.log('fetching order by id');
  return axios.get(`/api/admindata/orders/${orderId}`);
};

const createNewOrder = (order) => {
  console.log('create new order');
  return axios.post('/api/orders', order);
};

const deleteOrder = (orderId) => {
  console.log('delete order');
  return axios.post(`/api/orders/${orderId}`);
};

export const useOrders = () => {
  return useQuery('orders', fetchOrders);
};

export const useOrderById = ({ orderId }) => {
  return useQuery('order', () => fetchOrderById(orderId));
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
