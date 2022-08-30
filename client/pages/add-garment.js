import Link from 'next/link';
import buildClient from '../api/build-client';
import AddGarForm from '../components/AddGarForm';
import Layout from '../components/Layout';

const AddGarment = ({ user }) => {
  if (user === 'unauthorized') {
    return (
      <div className=' h-screen flex justify-center items-center px-40'>
        <h3 className='text-red-700 font-bold text-4xl text-center bg-gray-200 py-6 px-8 rounded-md'>
          You are not authorized to access this page
          <Link href='/'>
            <a className='block underline text-lg mt-4 text-gray-700'>
              Return to home screen
            </a>
          </Link>
        </h3>
      </div>
    );
  }

  return (
    <Layout home user={user}>
      <div className='flex flex-col justify-center items-center gap-8 py-16 px-auto'>
        <h2 className='text-center text-3xl pt-3'>
          Add garment details below:
        </h2>
        <AddGarForm />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const client = buildClient(ctx);
  const { data } = await client.get('/api/users/currentuser');
  const user = data.currentUser;
  console.log(user);

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    };
  }

  if (user.type !== 'admin') {
    return {
      props: { user: 'unauthorized' },
    };
  }

  return {
    props: { user },
  };
}

export default AddGarment;
