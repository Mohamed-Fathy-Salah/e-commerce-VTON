import axios from 'axios';
import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import CartContext from '../context/CartContext';

const addPayment = ({ token, orderId }) => {
  console.log('doing payment');
  return axios.post('/api/payments', { token, orderId });
};

export const usePayment = () => {
  const { clearCart } = useContext(CartContext);
  const queryClient = useQueryClient();
  return useMutation(addPayment, {
    onSuccess: () => {
      queryClient.invalidateQueries('orders');
      queryClient.invalidateQueries('customer-order');
      clearCart();
    },
  });
};
