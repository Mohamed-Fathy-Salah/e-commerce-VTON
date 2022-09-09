import axios from 'axios';
import { useState, useEffect } from 'react';

const CartSummary = ({ order, setOrder, cart, ls }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const priceArr = cart.map((item) => {
      const itemPrice = item.price;
      const cartData = JSON.parse(localStorage.getItem('cart-' + item.id));
      return (
        (cartData.small +
          cartData.medium +
          cartData.large +
          cartData.xlarge +
          cartData.xxlarge) *
        itemPrice
      );
    });
    const price = priceArr.reduce((prev, curr) => prev + curr, 0);
    setTotalPrice(price);
  }, [cart, ls]);

  const handleCheckout = async () => {
    const garments = cart.map((item) => {
      const sizeInfo = JSON.parse(localStorage.getItem('cart-' + item.id));

      return {
        adminId: item.adminId,
        garmentId: item.id,
        price: item.price,
        ...sizeInfo,
      };
    });

    const order = {
      garments,
    };

    console.log(order);
    const postOrder = await axios.post('/api/orders', order);
    console.log(postOrder);
  };

  return (
    <>
      <div className='grid grid-rows-4 rounded-md bg-gray-200 p-4 text-gray-600'>
        <h2 className='border-b border-gray-300 pb-2 font-semibold'>
          Order Summary
        </h2>
        <div className=' row-span-2 space-y-1 border-b border-gray-300 py-4'>
          <div className='flex justify-between'>
            <h3>Subtotal</h3>
            <h3 className='font-semibold'>{totalPrice} EGP</h3>
          </div>
          <div className='flex justify-between'>
            <h3>Shipping</h3>
            <h3 className='font-semibold'>Free</h3>
          </div>
        </div>
        <div className='flex justify-between pt-4'>
          <h3>Total</h3>
          <h3 className='font-semibold'>{totalPrice} EGP</h3>
        </div>
      </div>
      <button
        onClick={handleCheckout}
        className='my-2 w-full rounded-md bg-blue-700 px-6 py-4 text-white'
      >
        Checkout
      </button>
    </>
  );
};
export default CartSummary;
