import dynamic from 'next/dynamic';
import CartSummary from '../../components/CartSummary';
// import CartTable from '../../components/CartTable';
import Layout from '../../components/Layout';
import useSWR from 'swr';
import axios from 'axios';
import { useState, useEffect } from 'react';

const CartTable = dynamic(() => import('../../components/CartTable'), {
  ssr: false,
});

const CartPage = ({ user, cart }) => {
  useEffect(() => {
    const cart = Object.keys(localStorage)
      .filter((item) => item.startsWith('cart-'))
      .map((cartElm) => {
        const val = JSON.parse(localStorage.getItem(cartElm));
        val['garmentId'] = cartElm.slice(5);
        return val;
      });
    const cartBase64 = Buffer.from(JSON.stringify(cart)).toString('base64');
    // const cartArray = JSON.parse(
    //   Buffer.from(cartBase64, 'base64').toString('ascii')
    // );
    // console.log(cartArray);
    document.cookie = `cart=${cartBase64}`;
  }, []);

  return (
    <Layout home user={user}>
      <h1 className='my-20 text-center text-3xl font-semibold text-gray-700'>
        Your Cart
      </h1>
      <div className='grid grid-cols-4 gap-4 px-4 2xl:px-0'>
        <div className='col-span-4 md:col-span-3'>
          <CartTable garments={cart.garments} />
        </div>
        <div className='col-span-4 md:col-span-1'>
          <CartSummary />
        </div>
      </div>
    </Layout>
  );
};

CartPage.getInitialProps = async (context, client) => {
  const { data } = await client.get(`/api/cart`);

  if (!data) {
    return {
      cart: null,
    };
  }

  return {
    cart: data,
  };
};
export default CartPage;
