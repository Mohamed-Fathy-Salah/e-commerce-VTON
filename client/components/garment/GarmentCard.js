import Link from 'next/link';

const GarmentCard = ({ garment }) => {
  return (
    <div className='sm:w-60'>
      <Link href={'garment/' + garment.id}>
        <a className='group'>
          <div className='aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200'>
            <img
              src={'data:image;base64,' + garment.frontPhoto}
              alt={garment.garmentClass + '|' + garment.gender}
              className='h-full w-full object-cover object-center group-hover:opacity-75'
              width='100%'
              height='100%'
            />
          </div>
          <div className='my-3 '>
            <span className='mr-2 rounded bg-gray-300 px-2 py-1 text-sm text-gray-600'>
              {garment.gender}
            </span>
            <span className='mr-2 rounded bg-gray-300 px-2 py-1 text-sm text-gray-600'>
              {garment.garmentClass}
            </span>
          </div>
          <h3 className=' mt-1 break-words text-xl font-bold text-gray-900'>
            {garment.name || garment.garmentClass + '-' + garment.gender}
          </h3>
          <p className=' text-base font-bold text-gray-700'>
            {garment.price} EGP
          </p>
        </a>
      </Link>
    </div>
  );
};
export default GarmentCard;
