import { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Register = () => {
  const router = useRouter();
  const [genError, setGenError] = useState('');

  const handleFormSubmit = async (values, FormikHelpers) => {
    if (values.password !== values.password2) {
      setGenError(<div>Passwords do not match!</div>);
    } else {
      const data = {
        name: values.name,
        email: values.email,
        age: Number(values.age),
        gender: values.gender,
        password: values.password,
        type: values.accountType,
      };

      try {
        const res = await axios.post('/api/users/signup', data);
        console.log(res);
        FormikHelpers.resetForm();
        setGenError('');
        router.push('/');
      } catch (err) {
        {
          setGenError(
            <div className=''>
              <ul className='my-0'>
                {err.response.data.errors.map((err) => (
                  <li key={err.message}>{err.message}</li>
                ))}
              </ul>
            </div>
          );
          console.log(err);
        }
      }
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        age: '',
        gender: '',
        password: '',
        password2: '',
        accountType: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('This field is requried'),
        email: Yup.string()
          .email('Invalid email address')
          .required('This field is requried'),
        age: Yup.number()
          .typeError('age must be a number')
          .positive('age must be a positive number')
          .integer('age must be an integer')
          .max(150, 'exceeded max length'),
      })}
      onSubmit={(values, FormikHelpers) =>
        handleFormSubmit(values, FormikHelpers)
      }
    >
      <Form className='flex flex-col gap-4 w-10/12 lg:w-6/12 mx-auto bg-white p-6 sm:p-10 rounded-lg shadow-md'>
        <div>
          <label htmlFor='name' className='block mb-2 p-1'>
            Enter your name:
          </label>
          <Field
            id='name'
            name='name'
            type='text'
            placeholder='Enter your name ...'
          />
          <ErrorMessage name='name'>
            {(msg) => <div className=' text-red-600 p-1'>{msg}</div>}
          </ErrorMessage>
        </div>
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
          <label htmlFor='age' className='block mb-2 p-1'>
            Enter your age:
          </label>
          <Field
            id='age'
            name='age'
            type='text'
            placeholder='Enter your age ...'
          />
          <ErrorMessage name='age'>
            {(msg) => <div className=' text-red-600 p-1'>{msg}</div>}
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor='gender' className='block mb-2 p-1'>
            Select your gender
          </label>
          <Field as='select' id='gender' name='gender' className=''>
            <option className='text-gray-400' value=''>
              Please Select
            </option>
            <option value='male'>male</option>
            <option value='female'>female</option>
            <option value='neutral'>prefere not to say</option>
          </Field>
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
          <label htmlFor='password2' className='block mb-2 p-1'>
            Confirm your password:
          </label>
          <Field
            id='password2'
            name='password2'
            type='password'
            className=''
            placeholder='Confirm password ...'
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
        <div className=' text-red-600 p-1'>{genError}</div>
        <button
          type='submit'
          className='bg-blue-700 text-white rounded-md py-3 text-xl shadow-sm mt-3 hover:bg-blue-800 transition-colors'
        >
          Register
        </button>
      </Form>
    </Formik>
  );
};
export default Register;
