import '../styles/globals.css';
import DevNote from '../components/DevNote';
import axios from 'axios';

axios.defaults.baseURL = 'https://vton.dev';

// axios.create({
//   baseURL:
//     //"put domain name here instead"
//     'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
// });

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DevNote />
      <div className='max-w-screen-xl mx-auto'>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
