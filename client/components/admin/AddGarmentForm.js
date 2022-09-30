import axios from 'axios';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { Select, TextInput } from '../../components/utils/FormElements';

const AddGarmentForm = () => {
  const router = useRouter();
  const [genError, setGenError] = useState('');
  const [files, setFiles] = useState({
    front: '',
    back: '',
    images: [],
  });

  const postGarment = (data) => {
    return axios.post('/api/garments', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });
  };

  const queryClient = useQueryClient();
  const { mutate: addNewGarment } = useMutation(postGarment, {
    onSuccess: () => {
      queryClient.invalidateQueries('admin-garments');
    },
  });

  const handleFormSubmit = async (values, FormikHelpers) => {
    const data = {
      name: values.name,
      description: values.description,
      garmentClass: values.class,
      gender: values.gender,
      price: Number(values.price),
      small: Number(values.small),
      medium: Number(values.medium),
      large: Number(values.large),
      xlarge: Number(values.xlarge),
      xxlarge: Number(values.xxlarge),
      frontPhoto: files.front,
      backPhoto: files.back,
      photos: files.images,
    };

    try {
      addNewGarment(data);
      FormikHelpers.resetForm();
      setGenError('');
      router.push('/admin/dashboard/garments');
    } catch (err) {
      {
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
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        class: '',
        gender: '',
        price: '',
        small: '',
        medium: '',
        large: '',
        xlarge: '',
        xxlarge: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(30, 'Must be 30 characters or less')
          .required('This field is requried'),
        price: Yup.number()
          .typeError('price must be a number')
          .positive('price must be a positive number')
          .required('This field is requried'),
      })}
      onSubmit={(values, FormikHelpers) =>
        handleFormSubmit(values, FormikHelpers)
      }
    >
      <Form className='mx-auto flex w-10/12 flex-col gap-4 rounded-lg bg-white p-6 shadow-md sm:p-10 lg:w-6/12'>
        <TextInput
          label='Enter garment name'
          name='name'
          type='text'
          placeholder='Kint color block t-shirt'
        />

        <TextInput
          label='Enter garment description'
          name='description'
          type='textarea'
          placeholder='T-shirt made of spun cotton fabric. Featuring a round neckline, short sleeves and ribbed trims.'
        />

        <Select label='Select garment class' name='class'>
          <option value=''>Select One</option>
          <option value='shirt'>Shirt</option>
          <option value='pants'>Pants</option>
          <option value='short'>Short</option>
          <option value='skirt'>Skirt</option>
        </Select>

        <Select label='Select garment gender' name='gender'>
          <option value=''>Select One</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </Select>

        <TextInput
          label='Enter garment price (EGP)'
          name='price'
          type='number'
          placeholder='349'
        />

        <TextInput
          label='Enter garment qty | Small(S)'
          name='small'
          type='number'
          placeholder='70'
        />

        <TextInput
          label='Enter garment qty | Medium(M)'
          name='medium'
          type='number'
          placeholder='60'
        />

        <TextInput
          label='Enter garment qty | Large(L)'
          name='large'
          type='number'
          placeholder='70'
        />

        <TextInput
          label='Enter garment qty | XLarge(XL)'
          name='xlarge'
          type='number'
          placeholder='60'
        />

        <TextInput
          label='Enter garment qty | XXLarge(XXL)'
          name='xxlarge'
          type='number'
          placeholder='70'
        />

        <TextInput
          label='Enter garment photo (front photo)'
          name='front'
          type='file'
          onChange={(e) => setFiles({ ...files, front: e.target.files[0] })}
        />

        <TextInput
          label='Enter garment photo (back photo)'
          name='back'
          type='file'
          placeholder='70'
          onChange={(e) => setFiles({ ...files, back: e.target.files[0] })}
        />

        <TextInput
          label='Enter garment photos (preview photos)'
          name='preview'
          multiple
          type='file'
          placeholder='70'
          onChange={(e) => {
            let filesList = [];
            Object.values(e.target.files).map((file) => {
              filesList.push(file.name);
            });
            setFiles({ ...files, images: filesList });
          }}
        />

        <div className=' p-1 text-red-600'>{genError}</div>
        <button
          type='submit'
          className='mt-3 rounded-md bg-blue-700 py-3 text-xl text-white shadow-sm transition-colors hover:bg-blue-800'
        >
          Add Garment
        </button>
      </Form>
    </Formik>
  );
};
export default AddGarmentForm;
