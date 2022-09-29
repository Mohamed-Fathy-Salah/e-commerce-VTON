import { QueryClient, QueryClientProvider } from 'react-query';
import DevNote from '../components/utils/DevNote';
import { AppContextProvider } from '../context/AppContext';
import '../styles/globals.css';

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
