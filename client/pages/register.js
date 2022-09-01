import Link from 'next/link';
import Logo from '../components/Logo';
import Register from '../components/Register';

const RegisterPage = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-8 py-16 px-auto'>
      <div className='my-6'>
        <Logo size='text-5xl sm:text-6xl' />
        <p className='text-center text-xl pt-3'>
          Already registered?{' '}
          <Link href='/login'>
            <span className='cursor-pointer text-blue-700'>Sign in</span>
          </Link>
        </p>
      </div>
      <Register />
    </div>
  );
};
export default RegisterPage;
