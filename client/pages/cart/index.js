import dynamic from 'next/dynamic';
import CartSummary from '../../components/CartSummary';
// import CartTable from '../../components/CartTable';
import Layout from '../../components/Layout';

const CartTable = dynamic(() => import('../../components/CartTable'), {
  ssr: false,
});

const CartPage = ({ user }) => {
  return (
    <Layout home user={user}>
      <h1 className='my-20 text-center text-3xl font-semibold text-gray-700'>
        Your Cart
      </h1>
      <div className='grid grid-cols-4 gap-4 px-4 2xl:px-0'>
        <div className='col-span-4 md:col-span-3'>
          <CartTable />
        </div>
        <div className='col-span-4 md:col-span-1'>
          <CartSummary />
        </div>
      </div>
    </Layout>
  );
};
export default CartPage;
