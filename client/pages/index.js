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

      <footer className='flex h-24 w-full items-center justify-center border-t'>
        <span>© Smart Fasion 2022</span>
      </footer>
    </div>
  );
};

export default Home;
