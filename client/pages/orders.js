import { useContext } from 'react';
import Layout from '../components/layout/Layout';
import AuthContext from '../context/AuthContext';

const OrdersPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <Layout home user={user}>
      OrdersPage
    </Layout>
  );
};
export default OrdersPage;
