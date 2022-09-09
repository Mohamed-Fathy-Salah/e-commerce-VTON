import { useState } from 'react';
import Link from 'next/link';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const [genError, setGenError] = useState('');

  const handleLogin = async (values, FormikHelpers) => {
    const data = {
      email: values.email,
      password: values.password,
      type: values.accountType,
    };

    try {
      const res = await axios.post('/api/users/signin', data);

      FormikHelpers.resetForm();
      setGenError('');
      router.push('/');
    } catch (err) {
      setGenError(
        <div className=''>
          <ul className='my-0'>
            {err.response?.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
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
        <div>
          <label htmlFor='email' className='mb-2 block p-1'>
            Enter your email:
          </label>
          <Field
            id='email'
            name='email'
            type='email'
            placeholder='Enter your email ...'
          />
          <ErrorMessage name='email'>
            {(msg) => <div className=' p-1 text-red-600'>{msg}</div>}
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor='password' className='mb-2 block p-1'>
            Enter your password:
          </label>
          <Field
            id='password'
            name='password'
            type='password'
            className=''
            placeholder='Enter your password ...'
          />
        </div>
        <div>
          <label htmlFor='accountType' className='mb-2 block p-1'>
            Select your account type
          </label>
          <Field as='select' id='accountType' name='accountType' className=''>
            <option className='text-gray-400' value=''>
              Please Select
            </option>
            <option value='customer'>Normal user</option>
            <option value='admin'>Seller</option>
          </Field>
        </div>
        <div>{genError}</div>
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
