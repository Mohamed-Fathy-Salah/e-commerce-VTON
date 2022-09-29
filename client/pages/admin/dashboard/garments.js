import { useContext } from 'react';
import DashboardLayout from '../../../components/admin/DashboardLayout';
import Garments from '../../../components/admin/Garments';
import AuthContext from '../../../context/AuthContext';

const AdminGarmentsPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <DashboardLayout>
      <Garments user={user} />
    </DashboardLayout>
  );
};

export default AdminGarmentsPage;
