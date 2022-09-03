import Link from 'next/link';
import Logo from './Logo';
import { useRouter } from 'next/router';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

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
          <button className='cursor-pointer rounded-md bg-gray-200 p-3 text-gray-700 transition hover:bg-gray-300'>
            <ShoppingCartIcon className='h-6 w-6' />
          </button>
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
