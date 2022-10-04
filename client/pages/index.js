import { useContext, useState } from 'react';
import buildClient from '../api/build-client';
import GarmentList from '../components/garment/GarmentList';
import SearchBar from '../components/garment/SearchBar';
import Layout from '../components/layout/Layout';
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
    <Layout home user={user}>
      <main className='w-full items-center justify-center px-10 '>
        <div className='mx-auto max-w-screen-xl'>
          <SearchBar search={search} setSearch={setSearch} />
          {filteredGarment.length ? (
            <GarmentList garments={search ? filteredGarment : garments} />
          ) : (
            <div className='flex h-96 items-center justify-center text-xl font-medium text-gray-400'>
              No Garments Match
            </div>
          )}
        </div>
      </main>
    </Layout>
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
