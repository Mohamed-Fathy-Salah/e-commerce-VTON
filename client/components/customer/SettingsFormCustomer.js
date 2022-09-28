import axios from 'axios';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { Select, TextInput } from '../utils/FormElements';

const SettingsFormCustomer = ({ customer }) => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { mutate: updateCustomerProfile } = useMutation(
    (data) => axios.put('/api/customerdata', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user-profile');
      },
    }
  );

  const handleUpdateCustomerProfile = async (values) => {
    const data = {
      name: values.name,
      gender: values.gender,
      age: values.age,
      skinTone: values.skinTone,
    };

    updateCustomerProfile(data);
    router.push('/');
  };

  return (
    <Formik
      initialValues={{
        name: customer.name,
        gender: customer.gender,
        age: customer.age,
        skinTone: customer.skinTone,
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('This field is requried'),
        skinTone: Yup.string().max(20, 'Must be 20 characters or less'),
      })}
      onSubmit={(values) => handleUpdateCustomerProfile(values)}
    >
      <Form className='mx-auto flex w-10/12 flex-col gap-4 rounded-lg bg-white p-6 shadow-md sm:p-10 lg:w-6/12'>
        <TextInput
          label='Update your name'
          name='name'
          type='text'
          placeholder='xxxx xxxx'
        />

        <Select label='Update your gender' name='gender'>
          <option value=''>Select One</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </Select>

        <TextInput
          label='Update your age'
          name='age'
          type='number'
          placeholder='xx'
        />

        <Select label='Update your skin tone' name='skinTone'>
          <option value=''>Select One</option>
          <option value='white'>White</option>
          <option value='black'>Black</option>
          <option value='middleEastern'>Middle Eastern</option>
        </Select>
        <button
          type='submit'
          className='mt-3 rounded-md bg-blue-700 py-3 text-xl text-white shadow-sm transition-colors hover:bg-blue-800 disabled:bg-gray-500'
        >
          Update Profile
        </button>
      </Form>
    </Formik>
  );
};
export default SettingsFormCustomer;
