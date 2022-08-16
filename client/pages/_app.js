import '../styles/globals.css';
import DevNote from '../components/DevNote';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DevNote />
      <div className='max-w-screen-xl mx-auto'>
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
}

export default MyApp;
