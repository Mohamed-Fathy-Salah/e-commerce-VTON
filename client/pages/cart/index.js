import dynamic from 'next/dynamic';
import CartSummary from '../../components/CartSummary';
import Layout from '../../components/Layout';
import axios from 'axios';
import { useState, useEffect } from 'react';
import CartTable from '../../components/CartTable';
// const CartTable = dynamic(() => import('../../components/CartTable'), {
//   ssr: false,
// });

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

const CartPage = ({ user }) => {
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
