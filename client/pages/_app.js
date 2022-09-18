import '../styles/globals.css';
import DevNote from '../components/DevNote';
import { AppContextProvider } from '../context/AppContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DevNote />
      <div className='mx-auto max-w-screen-xl'>
        <QueryClientProvider client={queryClient}>
          <AppContextProvider>
            <Component {...pageProps} />
          </AppContextProvider>
        </QueryClientProvider>
      </div>
    </>
  );
}

export default MyApp;
