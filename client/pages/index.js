import Head from 'next/head';
import { useContext, useState } from 'react';
import buildClient from '../api/build-client';
import GarmentList from '../components/GarmentList';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import AuthContext from '../context/AuthContext';

const Home = ({ garments }) => {
  const { user } = useContext(AuthContext);

  const [search, setSearch] = useState('');
  const filteredGarment = garments.filter(
    (gar) =>
      gar.gender.toLowerCase().includes(search.toLowerCase()) ||
      gar.garmentClass.toLowerCase().includes(search.toLowerCase()) ||
      gar.description?.toLowerCase().includes(search.toLowerCase()) ||
      gar.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <Head>
        <title>SmartFasion</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout home user={user}>
        <main className='w-full items-center justify-center px-10 '>
          <SearchBar search={search} setSearch={setSearch} />
          {filteredGarment.length ? (
            <GarmentList garments={search ? filteredGarment : garments} />
          ) : (
            <div className='text-center text-xl font-medium text-gray-400'>
              {' '}
              No Garments Match
            </div>
          )}
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

export default Home;
