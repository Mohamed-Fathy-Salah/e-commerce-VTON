import Link from 'next/link';
import { useGarmentById } from '../../hooks/useGarments';

const SizeElem = ({ size, label }) => {
  return Number(size) ? (
    <>
      <span className='font-semibold text-blue-700'>{label}: </span>
      {size}
    </>
  ) : (
    ''
  );
};

const OrderGarment = ({ garment, orderStatus }) => {
  const { data: orderGarment, isLoading } = useGarmentById(garment.garmentId);

  if (isLoading) return <div>Loading ...</div>;

  return (
    <div className='flex flex-col justify-between gap-1 border-b py-6 first:pt-0 last:border-none last:pb-0 md:flex-row md:items-center '>
      <div className='text-lg'>
        <h5>
          <span className='font-semibold text-blue-700'>Garment Id: </span>
          <Link href={`/garment/${garment.garmentId}`}>
            <a className='hover:text-blue-700 hover:underline'>
              {garment.garmentId}
            </a>
          </Link>
        </h5>
        <h5>
          <span className='font-semibold text-blue-700'>Garment Name: </span>
          <Link href={`/garment/${garment.garmentId}`}>
            <a className='hover:text-blue-700 hover:underline'>
              {orderGarment?.data.name}
            </a>
          </Link>
        </h5>
        <h5>
          <span className='font-semibold text-blue-700'>Garment Class: </span>
          {orderGarment?.data.garmentClass}
        </h5>
        <h5>
          <span className='font-semibold text-blue-700'>Gender: </span>
          {orderGarment?.data.gender}
        </h5>
        <div className='flex gap-2'>
          <SizeElem size={garment.small} label='S' />
          <SizeElem size={garment.medium} label='M' />
          <SizeElem size={garment.large} label='L' />
          <SizeElem size={garment.xlarge} label='XL' />
          <SizeElem size={garment.xxlarge} label='XXL' />
        </div>
        <h5 className='flex gap-2'>
          <span className='font-semibold text-blue-700'>Item Price:</span>
          {garment.price} EGP
        </h5>
      </div>
      <div
        className={`rounded-md text-lg shadow-sm md:mr-5 md:p-7 ${
          orderStatus === 'created' || orderStatus === 'awaiting'
            ? 'border-yellow-600 md:border md:bg-orange-50'
            : orderStatus === 'completed'
            ? 'border-green-600 md:border md:bg-green-50'
            : 'border-red-600 md:border md:bg-red-50'
        }`}
      >
        <span
          className={`font-semibold md:block md:text-2xl ${
            orderStatus === 'created' || orderStatus === 'awaiting'
              ? 'text-yellow-600'
              : orderStatus === 'completed'
              ? 'text-green-600'
              : 'text-red-600'
          }`}
        >
          Total Price:{' '}
        </span>
        <span className='md:text-xl'>
          {(garment.medium +
            garment.small +
            garment.large +
            garment.xlarge +
            garment.xxlarge) *
            garment.price}{' '}
          EGP
        </span>
      </div>
    </div>
  );
};
export default OrderGarment;
