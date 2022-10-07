import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import CartSummary from '../../components/customer/cart/CartSummary';
import CartTable from '../../components/customer/cart/CartTable';
import Layout from '../../components/layout/Layout';
import AuthContext from '../../context/AuthContext';
import CartContext from '../../context/CartContext';
import { useCartGarments } from '../../hooks/useGarments';

const CartPage = () => {
  const { user } = useContext(AuthContext);
  const { getCart } = useContext(CartContext);

  const cartToCookie = () => {
    const cart = getCart();
    const cartBase64 = Buffer.from(JSON.stringify(cart)).toString('base64');
    document.cookie = `cart=${cartBase64}`;
  };

  const [updateLocalStorage, setUpdateLocalStorage] = useState(0);
  const [cart, setCart] = useState([]);

  const {
    data: cartGarments,
    isLoading,
    isError,
    error,
    refetch: fetchGarments,
  } = useCartGarments();

  useEffect(() => {
    cartToCookie();
    fetchGarments();
  }, []);

  useEffect(() => {
    const garments = cartGarments?.data.map((garment) => garment.value);
    setCart(garments);
  }, [cartGarments]);

  if (isError) console.error(error);
  if (isLoading) {
    return (
      <Layout home user={user} cartUpdate={cart}>
        <div className='flex h-72 flex-col items-center justify-center gap-2 text-2xl text-gray-500'>
          <h3>Loading ...</h3>
        </div>
      </Layout>
    );
  }

  if (!cartGarments) {
    return (
      <Layout home user={user} cartUpdate={cart}>
        <div className='mt-36 flex h-96 flex-col items-center justify-center gap-2 text-4xl text-gray-500'>
          <h3>The Cart Is Empty</h3>
          <Link href='/'>
            <a className='text-xl text-blue-700 underline hover:opacity-90'>
              Add products to cart
            </a>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout home user={user} cartUpdate={cart}>
      <h1 className='my-20 text-center text-3xl font-semibold text-gray-700'>
        Your Cart
      </h1>
      <div className='mx-auto grid w-full max-w-screen-2xl grid-cols-4 gap-10 px-10 md:px-16'>
        <div className='col-span-4 w-full overflow-x-auto whitespace-nowrap md:col-span-3'>
          <CartTable
            cart={cart}
            setCart={setCart}
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
