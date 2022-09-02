import GarmentItem from '../GarmentItem';
import useSWR from 'swr';
import axios from 'axios';

const Garments = ({ user }) => {
  const { data, error } = useSWR(`/api/garments/admin/${user?.id}`, (url) =>
    axios.get(url).then((res) => res.data)
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className='my-16 px-16'>
      <div className='flex flex-wrap justify-center gap-6 rounded-md bg-gray-100 p-8'>
        {data?.map((gar) => (
          <GarmentItem key={gar.id} garment={gar} />
        ))}
      </div>
    </div>
  );
};
export default Garments;
