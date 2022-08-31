import Link from 'next/link';
import Logo from './Logo';
import axios from 'axios';
import { useRouter } from 'next/router';

import ProfileMenu from './ProfileMenu';

const Nav = ({ user }) => {
  const router = useRouter();

  const links = !user ? (
    <>
      <Link href='/login'>
        <button className='mx-3 hidden px-4 py-1 sm:inline'>Login</button>
      </Link>
      <Link href='/register'>
        <button className='mx-3 rounded-full bg-blue-700 px-4 py-1 text-white shadow-sm'>
          Register
        </button>
      </Link>
    </>
  ) : (
    <>
      <ProfileMenu user={user} />
      {user.type === 'customer' && (
        <Link href='/cart'>
          <div className='cursor-pointer rounded-md bg-gray-200 p-3 text-gray-700 transition hover:bg-gray-300'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
              />
            </svg>
          </div>
        </Link>
      )}
    </>
  );

  return (
    <nav className='mb-10 flex w-full items-center justify-between border-b-2 py-6 px-10'>
      <Logo />
      <div className='flex items-center space-x-4'>{links}</div>
    </nav>
  );
};

export default Nav;
