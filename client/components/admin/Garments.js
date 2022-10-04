import axios from 'axios';
import { useQuery } from 'react-query';
import GarmentItem from '../garment/GarmentItem';

const Garments = ({ user }) => {
  const fetchAdminGarments = () => {
    console.log('fetching admin garments');
    return axios.get(`/api/garments/admin/${user?.id}`);
  };

  const {
    data: adminGarments,
    isLoading,
    isError,
  } = useQuery('admin-garments', fetchAdminGarments);

  if (isError)
    return (
      <div className='flex h-96 items-center justify-center'>
        failed to load
      </div>
    );
  if (isLoading)
    return (
      <div className='my-16 flex h-96 items-center justify-center px-16'>
        loading...
      </div>
    );

  return (
    <div className='my-16 px-16'>
      {adminGarments.data.length > 0 ? (
        <div className='flex flex-wrap justify-center gap-6 rounded-md p-8'>
          {adminGarments.data?.map((gar) => (
            <GarmentItem key={gar.id} garment={gar} />
          ))}
        </div>
      ) : (
        !isLoading && (
          <div className='flex flex-wrap justify-center gap-6 rounded-md bg-gray-100 p-8 text-lg'>
            You have no published garments yet!
          </div>
        )
      )}
    </div>
  );
};
export default Garments;
