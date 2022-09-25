import { useContext } from 'react';
import EditGarmentForm from '../../../components/admin/EditGarmentForm';
import Layout from '../../../components/layout/Layout';
import AuthContext from '../../../context/AuthContext';

const EditGarmentPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <Layout home user={user}>
      <EditGarmentForm />
    </Layout>
  );
};
export default EditGarmentPage;
