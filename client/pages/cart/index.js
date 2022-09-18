import CartSummary from '../../components/CartSummary';
import Layout from '../../components/Layout';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import CartTable from '../../components/CartTable';
import AuthContext from '../../context/AuthContext';
import Link from 'next/link';

const cartToCookie = () => {
  const cart = Object.keys(localStorage)
    .filter((item) => item.startsWith('cart-'))
    .map((cartElm) => {
      const val = JSON.parse(localStorage.getItem(cartElm));
      val['garmentId'] = cartElm.slice(5);
      return val;
    });
  const cartBase64 = Buffer.from(JSON.stringify(cart)).toString('base64');
  document.cookie = `cart=${cartBase64}`;
};

const CartPage = () => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [updateLocalStorage, setUpdateLocalStorage] = useState(0);

  useEffect(() => {
    cartToCookie();

    const fetchCart = async () => {
      const { data } = await axios.get('/api/garments?cart=1', {
        withCredentials: true,
      });
      const garments = data.map((gar) => gar.value);
      setCart(garments);
    };

    fetchCart();
  }, []);

  if (!user || user.type === 'admin') {
    return (
      <div className=' flex h-screen items-center justify-center px-40'>
        <h3 className='rounded-md bg-gray-200 py-6 px-8 text-center text-4xl font-medium text-red-600'>
          You are not authorized to access this page
          <Link href='/'>
            <a className='mt-4 block text-lg text-gray-700 underline'>
              Return to home screen
            </a>
          </Link>
        </h3>
      </div>
    );
  }

  return (
    <Layout home user={user} cartUpdate={cart}>
      <h1 className='my-20 text-center text-3xl font-semibold text-gray-700'>
        Your Cart
      </h1>
      <div className='grid grid-cols-4 gap-4 px-4 2xl:px-0'>
        <div className='col-span-4 md:col-span-3'>
          <CartTable
            garments={cart}
            setCart={setCart}
            cart={cart}
            updatels={setUpdateLocalStorage}
          />
        </div>
        <div className='col-span-4 md:col-span-1'>
          <CartSummary ls={updateLocalStorage} cart={cart} />
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
