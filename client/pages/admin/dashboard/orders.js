import { useContext } from 'react';
import buildClient from '../../../api/build-client';
import DashboardLayout from '../../../components/admin/DashboardLayout';
import Orders from '../../../components/admin/Orders';
import AuthContext from '../../../context/AuthContext';

const AdminOrdersPage = ({ orders }) => {
  const { user } = useContext(AuthContext);

  return (
    <DashboardLayout home user={user}>
      <Orders orders={orders} />
    </DashboardLayout>
  );
};

export async function getServerSideProps(ctx) {
  const client = buildClient(ctx);
  const { data } = await client.get('/api/admindata/orders');

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

export default AdminOrdersPage;
