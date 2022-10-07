import { useRouter } from 'next/router';
import { useContext } from 'react';
import buildClient from '../../../api/build-client';
import EditGarmentForm from '../../../components/admin/EditGarmentForm';
import Layout from '../../../components/layout/Layout';
import AuthContext from '../../../context/AuthContext';

const EditGarmentPage = ({ garment }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  return (
    <Layout home user={user}>
      <div className='px-auto flex flex-col items-center justify-center gap-8 py-16'>
        <h2 className='pt-3 text-center text-3xl'>Edit Garment Details:</h2>
        <EditGarmentForm garment={garment} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { garmentId } = context.params;
  const client = buildClient(context);
  const { data } = await client.get(`/api/garments/garment/${garmentId}`);

  if (!data)
    return {
      garment: null,
    };

  return {
    props: {
      garment: data,
    },
  };
}

export default EditGarmentPage;
