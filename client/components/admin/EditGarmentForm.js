import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';
import {
  Droparea,
  Select,
  TextInput,
} from '../../components/utils/FormElements';
import { useUpdateGarment } from '../../hooks/useGarments';

const EditGarmentForm = ({ garment }) => {
  const router = useRouter();
  const [genError, setGenError] = useState('');
  const [frontPhoto, setFrontPhoto] = useState('');
  const [backPhoto, setBackPhoto] = useState('');
  const [previewPhotos, setPreviewPhotos] = useState([]);

  const {
    name,
    description,
    garmentClass,
    gender,
    price,
    small,
    medium,
    large,
    xlarge,
    xxlarge,
  } = garment;

  const { mutate: updateGarmentInfo } = useUpdateGarment(garment.id);

  const handleFormSubmit = async (values, FormikHelpers) => {
    const data = {
      name: values.name,
      description: values.description,
      garmentClass: values.garmentClass,
      gender: values.gender,
      price: Number(values.price),
      small: Number(values.small),
      medium: Number(values.medium),
      large: Number(values.large),
      xlarge: Number(values.xlarge),
      xxlarge: Number(values.xxlarge),
      frontPhoto: frontPhoto || garment.frontPhoto,
      backPhoto: backPhoto || garment.backPhoto,
      photos: previewPhotos || garment.photos,
    };

    try {
      updateGarmentInfo(data);
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
        name,
        description,
        garmentClass,
        gender,
        price,
        small,
        medium,
        large,
        xlarge,
        xxlarge,
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

        <Select label='Select garment class' name='garmentClass'>
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

        <Droparea
          onDrop={(uploadedPhoto) => setFrontPhoto(uploadedPhoto[0])}
          onReject={(uploaedPhoto) =>
            console.log(`${uploaedPhoto[0]} has been rejected`)
          }
          photo={frontPhoto}
          multiple={false}
        />

        <Droparea
          onDrop={(uploadedPhoto) => setBackPhoto(uploadedPhoto[0])}
          onReject={(uploaedPhoto) =>
            console.log(`${uploaedPhoto[0]} has been rejected`)
          }
          photo={backPhoto}
          multiple={false}
        />

        <Droparea
          onDrop={(uploadedPhoto) => setPreviewPhotos(uploadedPhoto)}
          onReject={(uploaedPhoto) =>
            console.log(`${uploaedPhoto} has been rejected`)
          }
          photos={previewPhotos}
          multiple={true}
        />

        <div className=' p-1 text-red-600'>{genError}</div>
        <button
          type='submit'
          className='mt-3 rounded-md bg-blue-700 py-3 text-xl text-white shadow-sm transition-colors hover:bg-blue-800'
        >
          Update Garment
        </button>
      </Form>
    </Formik>
  );
};

export default EditGarmentForm;
