import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const addPayment = ({ token, orderId }) => {
  console.log('doing payment');
  return axios.post('/api/payments', { token, orderId });
};

export const usePayment = () => {
  const queryClient = useQueryClient();
  return useMutation(addPayment, {
    onSuccess: () => {
      queryClient.invalidateQueries('orders');
    },
  });
};
