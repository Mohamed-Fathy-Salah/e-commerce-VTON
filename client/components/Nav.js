import Link from 'next/link';
import Logo from './Logo';

import { useState } from 'react';
import { Menu } from '@headlessui/react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Nav = ({ user }) => {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await axios.post('/api/users/signout');
    console.log(res);
    router.push('/');
  };

  const links = !user ? (
    <>
      <Link href='/login'>
        <button className='mx-3 px-4 py-1 hidden sm:inline'>Login</button>
      </Link>
      <Link href='/register'>
        <button className='mx-3 px-4 py-1 rounded-full bg-blue-700 text-white shadow-sm'>
          Register
        </button>
      </Link>
    </>
  ) : (
    <>
      {user?.type === 'admin' && (
        <Link href='/add-garment'>
          <button className='px-8 py-1 rounded-full bg-blue-700 hover:bg-blue-800 transition text-white shadow-sm'>
            Add a new garment
          </button>
        </Link>
      )}
      <button
        onClick={handleLogout}
        className='mx-3 px-8 py-1 rounded-full bg-red-700 hover:bg-red-800 transition text-white shadow-sm'
      >
        Logout
      </button>
      <Link href='/cart'>
        <div className='p-3 rounded-full bg-gray-200 text-gray-700 cursor-pointer hover:bg-gray-300 transition'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
            />
          </svg>
        </div>
      </Link>
    </>
  );

  return (
    <nav className='flex justify-between items-center border-b-2 py-6 px-10 mb-10 w-full'>
      <Logo />
      <div className='flex'>{links}</div>
    </nav>
  );
};

export default Nav;
