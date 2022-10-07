import Link from 'next/link';
import Login from '../components/auth/Login';
import Logo from '../components/utils/Logo';

const LoginPage = () => {
  return (
    <div className='px-auto flex flex-col items-center justify-center gap-8 py-16'>
      <div className='my-6'>
        <Logo size='text-5xl sm:text-6xl' />
        <p className='pt-3 text-center text-xl'>
          Don't have account?{' '}
          <Link href='/register'>
            <span className='cursor-pointer text-blue-700'>Register</span>
          </Link>
        </p>
      </div>
      <Login />
    </div>
  );
};
export default LoginPage;
