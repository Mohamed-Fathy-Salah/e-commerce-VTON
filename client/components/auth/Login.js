import { Form, Formik } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import { Select, TextInput } from '..//utils/FormElements';

import { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';

const Login = () => {
  const [genError, setGenError] = useState('');
  const { login, error } = useContext(AuthContext);

  const handleLogin = async (values, FormikHelpers) => {
    const data = {
      email: values.email,
      password: values.password,
      type: values.accountType,
    };

    login(data);

    if (error) {
      setGenError(error);
    } else {
      FormikHelpers.resetForm();
      setGenError('');
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        accountType: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Invalid email address')
          .required('This field is requried'),
      })}
      onSubmit={(values, FormikHelpers) => handleLogin(values, FormikHelpers)}
    >
      <Form className='mx-auto flex w-10/12 flex-col gap-4 rounded-lg bg-white p-6 shadow-md sm:p-10 lg:w-6/12'>
        <TextInput
          label='Enter your email address'
          name='email'
          type='email'
          placeholder='test@example.com'
        />

        <TextInput
          label='Enter your password'
          name='password'
          type='password'
          placeholder='**************'
        />

        <Select label='Select account Type' name='accountType'>
          <option value=''>account type</option>
          <option value='admin'>Brand/Business</option>
          <option value='customer'>Normal User</option>
        </Select>

        <div className=' p-1 text-red-600'>{genError}</div>
        <Link href='#'>
          <p className='text-center underline'>Forgot your password ?</p>
        </Link>
        <button
          type='submit'
          className='mt-3 rounded-md bg-blue-700 py-3 text-xl text-white shadow-sm transition-colors hover:bg-blue-800'
        >
          Login
        </button>
      </Form>
    </Formik>
  );
};
export default Login;
