import '../styles/globals.css';
import DevNote from '../components/DevNote';
import buildClient from '../api/build-client';
import axios from 'axios';

function MyApp({ Component, pageProps, currentUser }) {
  return (
    <>
      <DevNote />
      <div className='mx-auto max-w-screen-xl'>
        <Component user={currentUser} {...pageProps} />
      </div>
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default MyApp;
