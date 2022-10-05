import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const fetchCustomerData = (customerId) => {
  console.log('fetching customer data');
  return axios.get(`/api/customerdata/${customerId}`);
};

const editCustomerData = (data) => {
  console.log('editing customer data');
  return axios.put(`/api/customerdata`, data);
};

export const useCustomerData = ({ customerId }) => {
  return useQuery('customer-data', () => fetchCustomerData(customerId));
};

export const useEditCustomerData = () => {
  const queryClient = useQueryClient();
  return useMutation(editCustomerData, {
    onSuccess: () => {
      queryClient.invalidateQueries('customer-data');
    },
  });
};
