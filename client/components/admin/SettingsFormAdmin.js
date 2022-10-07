import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';
import { useEditAdminData } from '../../hooks/useAdmin';
import { Droparea, TextInput } from '../utils/FormElements';

const SettingsFormAdmin = ({ admin }) => {
  const [file, setFile] = useState('');
  const router = useRouter();

  const { mutate: updateAdminProfile } = useEditAdminData();

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
export default SettingsFormAdmin;
