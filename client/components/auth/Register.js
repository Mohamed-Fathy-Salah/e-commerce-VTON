import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import * as Yup from 'yup';
import AuthContext from '../../context/AuthContext';
import { Checkbox, Select, TextInput } from '../utils/FormElements';

const Register = () => {
  const router = useRouter();
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
        data.type === 'admin'
          ? router.push('/admin/dashboard/orders')
          : router.push('/');
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
        acceptedTerms: false,
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
        <TextInput
          label='Enter your name'
          name='name'
          type='text'
          placeholder='Mohamed Kamel'
        />

        <TextInput
          label='Enter your email address'
          name='email'
          type='email'
          placeholder='test@example.com'
        />

        <TextInput
          label='Enter your age'
          name='age'
          type='number'
          placeholder='34'
        />

        <Select label='Select your gender' name='gender'>
          <option value=''>Select One</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </Select>

        <TextInput
          label='Enter your password'
          name='password'
          type='password'
          placeholder='**************'
        />

        <TextInput
          label='Enter your password'
          name='password2'
          type='password'
          placeholder='**************'
        />

        <Select label='Select account Type' name='accountType'>
          <option value=''>account type</option>
          <option value='admin'>Brand/Business</option>
          <option value='customer'>Normal User</option>
        </Select>

        <Checkbox name='acceptedTerms'>Agree to Terms and Conditions </Checkbox>

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
