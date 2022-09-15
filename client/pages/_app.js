import '../styles/globals.css';
import DevNote from '../components/DevNote';
import { AuthProvider } from '../context/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps, currentUser }) {
  return (
    <>
      <DevNote />
      <div className='mx-auto max-w-screen-xl'>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </QueryClientProvider>
      </div>
    </>
  );
}

export default MyApp;
