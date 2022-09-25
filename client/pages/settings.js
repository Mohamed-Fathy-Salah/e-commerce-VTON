import { useContext } from 'react';
import Layout from '../components/layout/Layout';
import AuthContext from '../context/AuthContext';

const SettingsPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <Layout home user={user}>
      SettingsPage
    </Layout>
  );
};
export default SettingsPage;
