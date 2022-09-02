import Head from 'next/head';
import GarmentList from '../components/GarmentList';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import buildClient from '../api/build-client';

const Home = ({ user, garments }) => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <Head>
        <title>SmartFasion</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout home user={user}>
        <main className='w-full items-center justify-center px-10 '>
          <SearchBar />
          <GarmentList garments={garments} />
        </main>
      </Layout>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const client = buildClient(ctx);
  const { data } = await client.get('/api/garments');

  if (data) {
    return {
      props: {
        garments: data,
      },
    };
  }

  return {
    props: {
      garments: null,
    },
  };
}

// export async function getServerSideProps(ctx) {
//   const client = buildClient(ctx);
//   const { data } = await client.get('/api/users/currentuser');
//   const user = data.currentUser;

//   // if (!user) {
//   //   return {
//   //     redirect: {
//   //       destination: '/login',
//   //       permanent: false,
//   //     },
//   //   };
//   // }

//   if (user) {
//     return {
//       props: { user },
//     };
//   }

//   return {
//     props: {
//       user: null,
//     },
//   };
// }

export default Home;
