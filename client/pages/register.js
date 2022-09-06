import Link from 'next/link';
import Logo from '../components/Logo';
import Register from '../components/Register';

const RegisterPage = () => {
  return (
    <div className='px-auto flex flex-col items-center justify-center gap-8 py-16'>
      <div className='my-6'>
        <Logo size='text-5xl sm:text-6xl' />
        <p className='pt-3 text-center text-xl'>
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
