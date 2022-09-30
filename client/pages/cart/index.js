import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import CartSummary from '../../components/customer/cart/CartSummary';
import CartTable from '../../components/customer/cart/CartTable';
import Layout from '../../components/layout/Layout';
import NotAuthorized from '../../components/utils/NotAuthorized';
import AuthContext from '../../context/AuthContext';
import CartContext from '../../context/CartContext';

const CartPage = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { getCart } = useContext(CartContext);

  const cartToCookie = () => {
    const cart = getCart();
    const cartBase64 = Buffer.from(JSON.stringify(cart)).toString('base64');
    document.cookie = `cart=${cartBase64}`;
  };

  const [cart, setCart] = useState([]);
  const [updateLocalStorage, setUpdateLocalStorage] = useState(0);

  useEffect(() => {
    cartToCookie();

    const fetchCart = async () => {
      const { data } = await axios.get('/api/garments?cart=1', {
        withCredentials: true,
      });
      console.log(data);
      const garments = data.map((gar) => gar.value);
      setCart(garments);
    };

    fetchCart();

    if (!user) {
      router.push('/login');
    }

    if (user?.type !== 'customer') {
      return <NotAuthorized />;
    }
  }, []);

  return (
    <Layout home user={user} cartUpdate={cart}>
      {cart.length ? (
        <>
          <h1 className='my-20 text-center text-3xl font-semibold text-gray-700'>
            Your Cart
          </h1>
          <div className='grid grid-cols-4 gap-4 px-4 2xl:px-0'>
            <div className='col-span-4 overflow-x-auto md:col-span-3'>
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
        </>
      ) : (
        <div className='flex h-72 flex-col items-center justify-center gap-2 text-4xl text-gray-500'>
          <h3>The Cart Is Empty</h3>
          <Link href='/'>
            <a className='text-xl text-blue-700 underline hover:opacity-90'>
              Add products to cart
            </a>
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default CartPage;
