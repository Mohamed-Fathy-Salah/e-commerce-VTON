import Head from 'next/head';
import GarmentList from '../components/GarmentList';
import SearchBar from '../components/SearchBar';

const Home = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <Head>
        <title>SmartFasion</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='w-full items-center justify-center px-10 '>
        <SearchBar />
        <GarmentList />
      </main>
    </div>
  );
};

export default Home;
