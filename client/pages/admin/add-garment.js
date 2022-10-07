import { useContext } from 'react';
import AddGarmentForm from '../../components/admin/AddGarmentForm';
import Layout from '../../components/layout/Layout';
import AuthContext from '../../context/AuthContext';

const AddGarment = () => {
  const { user } = useContext(AuthContext);

  return (
    <Layout home user={user}>
      <div className='px-auto flex flex-col items-center justify-center gap-8 py-16'>
        <h2 className='pt-3 text-center text-3xl'>
          Add garment details below:
        </h2>
        <AddGarmentForm />
      </div>
    </Layout>
  );
};

export default AddGarment;
