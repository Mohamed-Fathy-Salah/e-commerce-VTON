import Link from 'next/link';
import buildClient from '../../api/build-client';
import AddGarForm from '../../components/AddGarForm';
import Layout from '../../components/Layout';

const AddGarment = ({ user }) => {
  if (!user || user.type !== 'admin') {
    return (
      <div className=' flex h-screen items-center justify-center px-40'>
        <h3 className='rounded-md bg-gray-200 py-6 px-8 text-center text-4xl font-medium text-red-600'>
          You are not authorized to access this page
          <Link href='/'>
            <a className='mt-4 block text-lg text-gray-700 underline'>
              Return to home screen
            </a>
          </Link>
        </h3>
      </div>
    );
  }

  return (
    <Layout home user={user}>
      <div className='px-auto flex flex-col items-center justify-center gap-8 py-16'>
        <h2 className='pt-3 text-center text-3xl'>
          Add garment details below:
        </h2>
        <AddGarForm />
      </div>
    </Layout>
  );
};

export default AddGarment;
