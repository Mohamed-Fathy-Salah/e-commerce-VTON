import buildClient from '../../../api/build-client';
import DashboardLayout from '../../../components/admin/DashboardLayout';
import Garments from '../../../components/admin/Garments';

const AdminGarmentsPage = ({ garments }) => {
  return (
    <DashboardLayout>
      <Garments garments={garments} />
    </DashboardLayout>
  );
};

export async function getServerSideProps(ctx) {
  const client = buildClient(ctx);
  const { data: user } = await client.get('/api/users/currentuser');
  const { data } = await client.get(
    `/api/garments/admin/${user.currentUser.id}`
  );

  if (data) {
    return {
      props: {
        garments: data,
      },
    };
  }

  return {
    props: {
      garments: null,
    },
  };
}

export default AdminGarmentsPage;
