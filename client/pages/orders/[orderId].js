import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import StripeCheckout from 'react-stripe-checkout';
import buildClient from '../../api/build-client';
import SuccessfulPayment from '../../components/utils/SuccessfulPayment';
import AuthContext from '../../context/AuthContext';
import CartContext from '../../context/CartContext';
import { usePayment } from '../../hooks/usePayment';

const CheckoutPage = ({ order }) => {
  const router = useRouter();
  const orderId = router.query.orderId;
  const { user } = useContext(AuthContext);
  const { clearCart } = useContext(CartContext);

  const [timeLeft, setTimeLeft] = useState(0);
  const [successPayment, setSuccessPayment] = useState(false);

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order?.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  const queryClient = useQueryClient();
  const { mutate: doPayment } = usePayment({
    onSuccess: () => {
      queryClient.invalidateQueries('orders');
      queryClient.invalidateQueries('customer-order');
      clearCart();
      setSuccessPayment(true);
    },
  });

  const totalPrice = order?.garments
    .map(
      (garment) =>
        (garment.small +
          garment.medium +
          garment.large +
          garment.xlarge +
          garment.xxlarge) *
        garment.price
    )
    .reduce((prev, curr) => prev + curr);

  if (successPayment) return <SuccessfulPayment />;

  return (
    <div className='flex h-screen w-full flex-col items-center gap-5 p-36'>
      {timeLeft >= 0 ? (
        <>
          <h3 className='text-3xl'>Time left to pay: {timeLeft} seconds</h3>
          <StripeCheckout
            token={() => doPayment({ token: 'tok_visa', orderId })}
            stripeKey='pk_test_51LQZtWBAQNSaSjvuy8R5lyKO8pZpR74tgWtEW6Bp76sUqXUOSbS32A7exBrRFUMSNN3nND6b8eWHBuk72ESwJOHD00kYSbC9qY'
            amount={totalPrice * 100}
            currency='EGP'
            email={user?.email}
          />
        </>
      ) : (
        <>
          <h3 className='text-3xl font-semibold text-red-600'>Order Expired</h3>
          <Link href='/cart'>
            <a className='cursor-pointer text-xl underline hover:text-blue-700'>
              Go back to cart
            </a>
          </Link>
        </>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { orderId } = context.params;

  const client = buildClient(context);
  const { data } = await client.get(`/api/orders/${orderId}`);

  if (!data)
    return {
      order: null,
    };

  return {
    props: {
      order: data,
    },
  };
}

export default CheckoutPage;
