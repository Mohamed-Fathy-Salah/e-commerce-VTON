import axios from 'axios';
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

  const toBase64 = (string) => {
    Buffer.from(string).toString('base64');
  };

  const cartToCookie = () => {
    const cart = getCart();
    const cartBase64 = toBase64(JSON.stringify(cart));
    document.cookie = `cart=${cartBase64}`;
    console.log(document.cookie);
  };

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

    if (!user) {
      router.push('/login');
    }

    if (user?.type !== 'customer') {
      return <NotAuthorized />;
    }
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
