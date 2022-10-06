import GarmentItem from '../garment/GarmentItem';

const Garments = ({ garments }) => {
  return (
    <div className='my-16 px-16'>
      {garments.length > 0 ? (
        <div className='flex flex-wrap justify-center gap-6 rounded-md p-8'>
          {garments.map((garment) => (
            <GarmentItem key={garment.id} garment={garment} />
          ))}
        </div>
      ) : (
        <div className='flex flex-wrap justify-center gap-6 rounded-md bg-gray-100 p-8 text-lg'>
          You have no published garments yet!
        </div>
      )}
    </div>
  );
};
export default Garments;
