import { useState, useContext } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../context/AuthContext';

const Register = () => {
  const [genError, setGenError] = useState('');
  const { register, error } = useContext(AuthContext);

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

      register(data);

      if (error) {
        setGenError(error);
      } else {
        FormikHelpers.resetForm();
        setGenError('');
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
      <Form className='mx-auto flex w-10/12 flex-col gap-4 rounded-lg bg-white p-6 shadow-md sm:p-10 lg:w-6/12'>
        <div>
          <label htmlFor='name' className='mb-2 block p-1'>
            Enter your name:
          </label>
          <Field
            id='name'
            name='name'
            type='text'
            placeholder='Enter your name ...'
          />
          <ErrorMessage name='name'>
            {(msg) => <div className=' p-1 text-red-600'>{msg}</div>}
          </ErrorMessage>
        </div>
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
          <label htmlFor='age' className='mb-2 block p-1'>
            Enter your age:
          </label>
          <Field
            id='age'
            name='age'
            type='text'
            placeholder='Enter your age ...'
          />
          <ErrorMessage name='age'>
            {(msg) => <div className=' p-1 text-red-600'>{msg}</div>}
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor='gender' className='mb-2 block p-1'>
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
          <label htmlFor='password2' className='mb-2 block p-1'>
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
        <div className=' p-1 text-red-600'>{genError}</div>
        <button
          type='submit'
          className='mt-3 rounded-md bg-blue-700 py-3 text-xl text-white shadow-sm transition-colors hover:bg-blue-800'
        >
          Register
        </button>
      </Form>
    </Formik>
  );
};
export default Register;
