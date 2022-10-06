import { useContext } from 'react';
import buildClient from '../api/build-client';
import SettingsFormAdmin from '../components/admin/SettingsFormAdmin';
import SettingsFormCustomer from '../components/customer/SettingsFormCustomer';
import Layout from '../components/layout/Layout';
import AuthContext from '../context/AuthContext';

const SettingsPage = ({ profile }) => {
  const { user } = useContext(AuthContext);

  return (
    <Layout home user={user}>
      <h1 className='my-20 text-center text-3xl font-semibold text-gray-700'>
        Edit your profile
      </h1>
      {user?.type === 'admin' ? (
        <SettingsFormAdmin admin={profile} />
      ) : (
        <SettingsFormCustomer customer={profile} />
      )}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const client = buildClient(context);
  const { data } = await client.get(`/api/users/currentuser`);

  const userType = data.currentUser.type;
  const userId = data.currentUser.id;

  let profile = null;

  if (userType === 'admin') {
    const { data } = await client.get(`/api/admindata/data/${userId}`);
    profile = data;
  }

  if (userType === 'customer') {
    const { data } = await client.get(`/api/customerdata/${userId}`);
    profile = data;
  }

  if (!data)
    return {
      profile: null,
    };

  return {
    props: {
      profile,
    },
  };
}

export default SettingsPage;
