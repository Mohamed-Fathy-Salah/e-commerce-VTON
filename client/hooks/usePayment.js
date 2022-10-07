import axios from 'axios';
import { useMutation } from 'react-query';

const addPayment = ({ token, orderId }) => {
  console.log('doing payment');
  return axios.post('/api/payments', { token, orderId });
};

export const usePayment = (config) => {
  return useMutation(addPayment, config);
};
