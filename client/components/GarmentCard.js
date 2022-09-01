import Link from 'next/link';
import Image from 'next/image';

const GarmentCard = ({ imgSrc, name, price }) => {
  return (
    <>
      <Link href='/garment'>
        <a className='group'>
          <div className='w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8'>
            <img
              src={imgSrc}
              alt={name + '|' + price}
              className='w-full h-full object-center object-cover group-hover:opacity-75'
              width='100%'
              height='100%'
            />
          </div>
          <div className='my-3 '>
            <span className='text-sm px-2 py-1 bg-gray-300 rounded mr-2 text-gray-600'>
              Male
            </span>
            <span className='text-sm px-2 py-1 bg-gray-300 rounded mr-2 text-gray-600'>
              Shirt
            </span>
          </div>
          <h3 className=' mt-1 font-bold text-xl text-gray-900'>{name}</h3>
          <p className=' text-base font-bold text-gray-700'>{price}</p>
        </a>
      </Link>
    </>
  );
};
export default GarmentCard;
