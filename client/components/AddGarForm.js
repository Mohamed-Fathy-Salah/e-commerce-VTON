import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useDropzone } from 'react-dropzone';

const AddGarForm = () => {
  const [genError, setGenError] = useState('');

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
    },
  });

  const openDialog = () => {
    // Note that the ref is set async,
    // so it might be null at some point
    if (dropzoneRef.current) {
      dropzoneRef.current.open();
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
        avilable: [], //add validation schema
        frontPhoto: '',
        backPhoto: '',
        photos: [],
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
      <Form className='flex flex-col gap-4 w-10/12 lg:w-6/12 mx-auto bg-white p-6 sm:p-10 rounded-lg shadow-md'>
        <div>
          <label htmlFor='name' className='block mb-2 p-1'>
            Garment Name:
          </label>
          <Field
            id='name'
            name='name'
            type='text'
            placeholder='e.g. kint color block t-shirt'
          />
          <ErrorMessage name='name'>
            {(msg) => <div className=' text-red-600 p-1'>{msg}</div>}
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor='desc' className='block mb-2 p-1'>
            Garment Description:
          </label>
          <Field
            as='textarea'
            className=' h-32 resize-none'
            id='desc'
            name='desc'
            type='text'
            placeholder='e.g. T-shirt made of spun cotton fabric. Featuring a round neckline, short sleeves and ribbed trims.'
          ></Field>
          <ErrorMessage name='email'>
            {(msg) => <div className=' text-red-600 p-1'>{msg}</div>}
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor='class' className='block mb-2 p-1'>
            Garment Class:
          </label>
          <Field
            as='select'
            id='class'
            name='class'
            type='text'
            placeholder='Enter your age ...'
          >
            <option value=''>select class</option>
            <option value='t-shirt'>T-Shirt</option>
            <option value='pants'>Pants</option>
            <option value='short'>Short</option>
            <option value='skirt'>Skirt</option>
          </Field>
          <ErrorMessage name='age'>
            {(msg) => <div className=' text-red-600 p-1'>{msg}</div>}
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor='gender' className='block mb-2 p-1'>
            Gender:
          </label>
          <Field as='select' id='gender' name='gender' className=''>
            <option className='text-gray-400' value=''>
              Select Gender
            </option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='neutral'>Prefere not to say</option>
          </Field>
        </div>
        <div>
          <label htmlFor='price' className='block mb-2 p-1'>
            Garment Price:
          </label>
          <Field
            id='price'
            name='price'
            type='number'
            placeholder='e.g. 188 EGP'
          />
        </div>
        <div>
          <label htmlFor='quantity' className='block mb-2 p-1'>
            Avilable Quantity:
          </label>
          <Field
            id='quantity'
            name='quantity'
            type='text'
            placeholder='quantity'
          />
        </div>
        <div>
          <label htmlFor='front-img' className='block mb-2 p-1'>
            Front Image:
          </label>
          <Field type='file' id='front-img' name='front-img' />
        </div>
        <div>
          <label htmlFor='back-img' className='block mb-2 p-1'>
            Back Image:
          </label>
          <Field type='file' id='back-img' name='back-img' />
        </div>
        <div>
          <label htmlFor='prev-imgs' className='block mb-2 p-1'>
            Preview Images:
          </label>
          <Field type='file' id='prev-imgs' name='prev-imgs' />
        </div>
        <div className=' text-red-600 p-1'>{genError}</div>
        <button
          type='submit'
          className='bg-blue-700 text-white rounded-md py-3 text-xl shadow-sm mt-3 hover:bg-blue-800 transition-colors'
        >
          Add Garment
        </button>
      </Form>
    </Formik>
  );
};
export default AddGarForm;
