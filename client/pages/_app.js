import '../styles/globals.css';
import DevNote from '../components/DevNote';
import Nav from '../components/Nav';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DevNote />
      <div className='max-w-screen-xl mx-auto'>
        <Nav />
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
