import Link from 'next/link';
import Logo from './Logo';
import { useRouter } from 'next/router';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useEffect, useState, useContext } from 'react';
import ProfileMenu from './ProfileMenu';
import AuthContext from '../context/AuthContext';

const Nav = ({ user, cartUpdate }) => {
  const { isLoading } = useContext(AuthContext);

  const getCartItemsCount = () => {
    return Object.keys(localStorage).filter((item) => item.startsWith('cart-'))
      ?.length;
  };

  const [cart, setCart] = useState(() => getCartItemsCount);
  const [nav, setNav] = useState(<span>Loading...</span>);

  useEffect(() => {
    if (isLoading) setNav(<span>Loading...</span>);
    if (user) {
      setNav(
        <>
          <ProfileMenu user={user} />
          {user.type === 'customer' && (
            <Link href='/cart'>
              <button className='relative cursor-pointer rounded-md bg-gray-200 p-3 text-gray-700 transition hover:bg-gray-300 '>
                {cart > 0 && (
                  <div className='absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-600 p-1 text-xs text-white'>
                    {cart}
                  </div>
                )}
                <ShoppingCartIcon className='h-6 w-6' />
              </button>
            </Link>
          )}
        </>
      );
    } else {
      setNav(
        <>
          <Link href='/login'>
            <button className='mx-3 px-4 py-1 '>Login</button>
          </Link>
          <Link href='/register'>
            <button className='mx-3 hidden rounded-full bg-blue-700 px-4 py-1 text-white shadow-sm sm:inline'>
              Register
            </button>
          </Link>
        </>
      );
    }
  }, [isLoading, user]);

  useEffect(() => {
    const cart = Object.keys(localStorage).filter((item) =>
      item.startsWith('cart-')
    )?.length;
    setCart(cart);
  }, [cartUpdate]);

  if (isLoading) {
    return <span>loading...</span>;
  }

  return (
    <nav className='mb-10 flex w-full items-center justify-between border-b-2 py-6 px-10'>
      <Logo />
      <div className='flex items-center space-x-4'>{nav}</div>
    </nav>
  );
};

export default Nav;
