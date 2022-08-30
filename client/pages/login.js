import Link from 'next/link';
import Logo from '../components/Logo';
import Login from '../components/Login';

const LoginPage = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-8 py-16 px-auto'>
      <div className='my-6'>
        <Logo size='text-5xl sm:text-6xl' />
        <p className='text-center text-xl pt-3'>
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
