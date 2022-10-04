import GarmentCard from './GarmentCard';

const GarmentList = ({ garments }) => {
  return (
    <div className='py-16'>
      <div className='flex flex-wrap justify-center gap-y-10 gap-x-10'>
        {garments.map((garment) => (
          <GarmentCard key={garment.id} garment={garment} />
        ))}
      </div>
    </div>
  );
};
export default GarmentList;
