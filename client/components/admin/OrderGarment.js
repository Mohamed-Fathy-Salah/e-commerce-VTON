import Image from 'next/image';
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

const OrderGarment = ({ order, orderStatus }) => {
  const { data: orderGarment, isLoading } = useGarmentById(order.garmentId);

  if (isLoading) return <div>Loading ...</div>;

  return (
    <div className='mt-3 flex flex-col justify-between gap-1 md:flex-row md:items-center'>
      <div className='flex items-center gap-5'>
        <div className='hidden md:block'>
          <Image
            src={'data:image;base64,' + orderGarment?.data.frontPhoto}
            alt='garment photo'
            className='rounded-md hover:opacity-75'
            width={200}
            height={200}
            objectFit='cover'
          />
        </div>
        <div className='text-lg'>
          <h5>
            <span className='font-semibold text-blue-700'>Garment Id: </span>
            <Link href={`/garment/${order.garmentId}`}>
              <a className='hover:text-blue-700 hover:underline'>
                {order.garmentId}
              </a>
            </Link>
          </h5>
          <h5>
            <span className='font-semibold text-blue-700'>Garment Name: </span>
            <Link href={`/garment/${order.garmentId}`}>
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
            <SizeElem size={order.small} label='S' />
            <SizeElem size={order.medium} label='M' />
            <SizeElem size={order.large} label='L' />
            <SizeElem size={order.xlarge} label='XL' />
            <SizeElem size={order.xxlarge} label='XXL' />
          </div>
          <h5 className='flex gap-2'>
            <span className='font-semibold text-blue-700'>Item Price:</span>
            {order.price} EGP
          </h5>
        </div>
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
          {(order.medium +
            order.small +
            order.large +
            order.xlarge +
            order.xxlarge) *
            order.price}{' '}
          EGP
        </span>
      </div>
    </div>
  );
};
export default OrderGarment;
