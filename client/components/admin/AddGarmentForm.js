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
  const [frontPhoto, setFrontPhoto] = useState('');
  const [backPhoto, setBackPhoto] = useState('');
  const [previewPhotos, setPreviewPhotos] = useState([]);

  console.log(frontPhoto);
  console.log(backPhoto);
  console.log(previewPhotos);

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
    const formData = new FormData();
    formData.set('name', values.name);
    formData.set('description', values.description);
    formData.set('garmentClass', values.class);
    formData.set('gender', values.gender);
    formData.set('price', Number(values.price));
    formData.set('small', Number(values.small));
    formData.set('medium', Number(values.medium));
    formData.set('large', Number(values.large));
    formData.set('xlarge', Number(values.xlarge));
    formData.set('xxlarge', Number(values.xxlarge));
    formData.set('frontPhoto', frontPhoto);
    formData.set('backPhoto', backPhoto);

    previewPhotos.forEach((photo) => {
      formData.append('photos', photo);
    });

    console.log(formData);

    try {
      addNewGarment(formData);
      // FormikHelpers.resetForm();
      setGenError('');
      // router.push('/admin/dashboard/garments');
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
        name: Yup.string().required('This field is requried'),
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
          onChange={(e) => setFrontPhoto(e.target.files[0])}
        />

        <TextInput
          label='Enter garment photo (back photo)'
          name='back'
          type='file'
          placeholder='70'
          onChange={(e) => setBackPhoto(e.target.files[0])}
        />

        <TextInput
          label='Enter garment photos (preview photos)'
          name='preview'
          multiple
          type='file'
          placeholder='70'
          onChange={(e) => {
            setPreviewPhotos(Object.values(e.target.files));
            console.log(previewPhotos);
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
