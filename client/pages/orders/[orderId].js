import { useRouter } from 'next/router';
import { useContext } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import AuthContext from '../../context/AuthContext';
import { useCustomerOrderById } from '../../hooks/useOrders';
import { usePayment } from '../../hooks/usePayment';

const CheckoutPage = () => {
  const router = useRouter();
  const orderId = router.query.orderId;
  const { user } = useContext(AuthContext);

  const {
    data: order,
    isError,
    error,
    isLoading,
  } = useCustomerOrderById(orderId);
  const { mutate: doPayment } = usePayment();

  if (isLoading) return <div>Loading ...</div>;
  if (isError) console.error(error);

  const totalPrice = order?.data.garments
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

  return (
    <div>
      <StripeCheckout
        token={() => doPayment({ token: 'tok_visa', orderId })}
        stripeKey='pk_test_51LQZtWBAQNSaSjvuy8R5lyKO8pZpR74tgWtEW6Bp76sUqXUOSbS32A7exBrRFUMSNN3nND6b8eWHBuk72ESwJOHD00kYSbC9qY'
        amount={totalPrice * 100}
        currency='EGP'
        email={user?.email}
      />
    </div>
  );
};
export default CheckoutPage;
