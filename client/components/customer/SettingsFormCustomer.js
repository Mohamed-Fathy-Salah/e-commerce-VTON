import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';
import { useEditCustomerData } from '../../hooks/useCustomer';
import { Droparea, Select, TextInput } from '../utils/FormElements';

const SettingsFormCustomer = ({ customer }) => {
  const [file, setFile] = useState('');
  const router = useRouter();

  console.log(file);

  const { mutate: updateCustomerProfile } = useEditCustomerData();

  const handleUpdateCustomerProfile = async (values) => {
    const data = {
      name: values.name,
      gender: values.gender,
      age: values.age,
      skinTone: values.skinTone,
      photo: file,
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

        <Droparea
          onDrop={(uploadedPhoto) => setFile(uploadedPhoto[0])}
          onReject={(uploaedPhoto) =>
            console.log(`${uploaedPhoto[0]} has been rejected`)
          }
          photo={file}
          multiple={false}
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
export default SettingsFormCustomer;
