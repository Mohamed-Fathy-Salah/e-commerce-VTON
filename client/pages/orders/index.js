import { useContext } from 'react';
import buildClient from '../../api/build-client';
import Layout from '../../components/layout/Layout';
import OrderRow from '../../components/OrderRow';
import AuthContext from '../../context/AuthContext';

const OrdersPage = ({ orders }) => {
  const { user } = useContext(AuthContext);
  console.log(orders);
  return (
    <Layout home user={user}>
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
