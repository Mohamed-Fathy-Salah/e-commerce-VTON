import axios from 'axios';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { TextInput } from '../utils/FormElements';

const SettingsFormAdmin = ({ admin }) => {
  const [file, setFile] = useState('');
  const router = useRouter();

  const queryClient = useQueryClient();
  const { mutate: updateAdminProfile } = useMutation(
    (data) =>
      axios.put('/api/admindata', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user-profile');
      },
    }
  );

  const handleUpdateAdminProfile = async (values) => {
    const data = {
      name: values.name,
      photo: file,
    };

    updateAdminProfile(data);
    router.push('/');
  };

  return (
    <Formik
      initialValues={{
        name: admin.name,
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('This field is requried'),
      })}
      onSubmit={(values) => handleUpdateAdminProfile(values)}
    >
      <Form className='mx-auto flex w-10/12 flex-col gap-4 rounded-lg bg-white p-6 shadow-md sm:p-10 lg:w-6/12'>
        <TextInput
          label='Update your business name'
          name='name'
          type='text'
          placeholder='xxxx xxxx'
        />

        <TextInput
          label='Upload profile photo'
          name='file'
          type='file'
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />

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
export default SettingsFormAdmin;
