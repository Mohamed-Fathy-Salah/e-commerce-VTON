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
      console.log(res);
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
      console.log(err);
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
      <Form className='flex flex-col gap-4 w-10/12 lg:w-6/12 mx-auto bg-white p-6 sm:p-10 rounded-lg shadow-md'>
        <div>
          <label htmlFor='email' className='block mb-2 p-1'>
            Enter your email:
          </label>
          <Field
            id='email'
            name='email'
            type='email'
            placeholder='Enter your email ...'
          />
          <ErrorMessage name='email'>
            {(msg) => <div className=' text-red-600 p-1'>{msg}</div>}
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor='password' className='block mb-2 p-1'>
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
          <label htmlFor='accountType' className='block mb-2 p-1'>
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
          <p className='underline text-center'>Forgot your password ?</p>
        </Link>
        <button
          type='submit'
          className='bg-blue-700 text-white rounded-md py-3 text-xl shadow-sm mt-3 hover:bg-blue-800 transition-colors'
        >
          Login
        </button>
      </Form>
    </Formik>
  );
};
export default Login;
