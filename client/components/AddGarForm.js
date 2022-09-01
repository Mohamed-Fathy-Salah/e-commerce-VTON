import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

const AddGarForm = () => {
  const [genError, setGenError] = useState('');
  const [files, setFiles] = useState({
    front: '',
    back: '',
    images: [],
  });

  console.log(files);
  const handleLogin = async (values, FormikHelpers) => {
    console.log(values);
    // const data = {
    //   name: values.name,
    //   description: values.description,
    //   garmentClass: values.class,
    //   gender: values.gender,
    //   price: Number(values.price),
    //   small: Number(values.smallQnt),
    //   medium: Number(values.mediumQnt),
    //   large: Number(values.largeQnt),
    //   xlarge: Number(values.xlQnt),
    //   xxlarge: Number(values.xxlQnt),
    //   frontPhoto: values.frontPhoto,
    //   backPhoto: values.backPhoto,
    //   photos: values.photos,
    // };

    // try {
    //   const res = await axios.post('/api/garments', data, {
    //     'Content-Type': 'multipart/form-data',
    //   });
    //   console.log(res);
    //   // FormikHelpers.resetForm();
    //   setGenError('');
    //   router.push('/');
    // } catch (err) {
    //   {
    //     setGenError(
    //       <div className=''>
    //         <ul className='my-0'>
    //           {err.response.data.errors.map((err) => (
    //             <li key={err.message}>{err.message}</li>
    //           ))}
    //         </ul>
    //       </div>
    //     );
    //     console.log(err);
    //   }
    // }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        class: '',
        gender: '',
        price: '',
        smallQnt: '',
        mediumQnt: '',
        largeQnt: '',
        xlQnt: '',
        xxlQnt: '',
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
      <Form className='mx-auto flex w-10/12 flex-col gap-4 rounded-lg bg-white p-6 shadow-md sm:p-10 lg:w-6/12'>
        <div>
          <label htmlFor='name' className='mb-2 block p-1'>
            Garment Name:
          </label>
          <Field
            id='name'
            name='name'
            type='text'
            placeholder='e.g. kint color block t-shirt'
          />
          <ErrorMessage name='name'>
            {(msg) => <div className=' p-1 text-red-600'>{msg}</div>}
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor='desc' className='mb-2 block p-1'>
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
            {(msg) => <div className=' p-1 text-red-600'>{msg}</div>}
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor='class' className='mb-2 block p-1'>
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
            {(msg) => <div className=' p-1 text-red-600'>{msg}</div>}
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor='gender' className='mb-2 block p-1'>
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
          <label htmlFor='price' className='mb-2 block p-1'>
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
          <label htmlFor='smallQnt' className='mb-2 block p-1'>
            Avilable Quantity:
          </label>
          <div className='flex gap-2'>
            <Field
              id='smallQnt'
              name='smallQnt'
              type='number'
              placeholder='Small'
            />
            <Field
              id='mediumQnt'
              name='mediumQnt'
              type='number'
              placeholder='Medium'
            />
            <Field
              id='largeQnt'
              name='largeQnt'
              type='number'
              placeholder='Large'
            />
            <Field id='xlQnt' name='xlQnt' type='number' placeholder='XL' />
            <Field id='xxlQnt' name='xxlQnt' type='number' placeholder='XXL' />
          </div>
        </div>
        <div>
          <label htmlFor='front-img' className=' block p-1'>
            Front Image:
          </label>
          <input
            type='file'
            id='front-img'
            name='front-img'
            value={files.front}
            onChange={(e) => setFiles({ ...files, front: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor='back-img' className=' block p-1'>
            Back Image:
          </label>
          <input
            type='file'
            id='back-img'
            name='back-img'
            value={files.back}
            onChange={(e) => setFiles({ ...files, back: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor='prev-imgs' className='block p-1'>
            Preview Images:
          </label>
          <input
            className='py-0'
            type='file'
            multiple
            id='prev-imgs'
            name='prev-imgs'
            value={files.images}
            onChange={(e) => setFiles({ ...files, images: [e.target.files] })}
          />
        </div>
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
export default AddGarForm;
