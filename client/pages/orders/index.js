import { useContext } from 'react';
import buildClient from '../../api/build-client';
import OrderRow from '../../components/customer/OrderRow';
import Layout from '../../components/layout/Layout';
import AuthContext from '../../context/AuthContext';

const OrdersPage = ({ orders }) => {
  const { user } = useContext(AuthContext);

  return (
    <Layout home user={user}>
      <h1 className='mt-20 mb-10 text-center text-3xl font-semibold text-gray-700'>
        Your orders
      </h1>
      <section className='mx-auto w-full max-w-4xl items-center justify-center p-10'>
        {orders.map((order) => (
          <OrderRow key={order.id} order={order} />
        ))}
      </section>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const client = buildClient(ctx);
  const { data } = await client.get('/api/orders');

  if (data) {
    return {
      props: {
        orders: data,
      },
    };
  }

  return {
    props: {
      orders: null,
    },
  };
}

export default OrdersPage;
