import GarmentCard from './GarmentCard';

const GarmentList = ({ garments }) => {
  return (
    <>
      <div className=' w-full'>
        <div className='mx-auto max-w-2xl py-8 px-4 sm:py-10 lg:max-w-7xl'>
          <div className='grid grid-cols-1 gap-y-10 gap-x-10 sm:grid-cols-2 lg:grid-cols-3  xl:gap-x-12'>
            {garments.map((garment) => (
              <GarmentCard key={garment.id} garment={garment} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default GarmentList;
