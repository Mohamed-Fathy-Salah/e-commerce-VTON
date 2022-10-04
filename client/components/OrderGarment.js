import axios from 'axios';
import Link from 'next/link';
import { useQuery } from 'react-query';

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

const OrderGarment = ({ order }) => {
  const { data: orderGarment } = useQuery('order-garment', () =>
    axios.get(`/api/garments/garment/${order.garmentId}`)
  );

  console.log(orderGarment.data);

  return (
    <div className='mt-3 flex flex-col justify-between gap-1 md:flex-row md:items-center'>
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
              {orderGarment.data?.name}
            </a>
          </Link>
        </h5>
        <h5>
          <span className='font-semibold text-blue-700'>Garment Class: </span>
          {orderGarment.data?.garmentClass}
        </h5>
        <h5>
          <span className='font-semibold text-blue-700'>Gender: </span>
          {orderGarment.data?.gender}
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
      <div className='text-lg md:p-10'>
        <span className='font-semibold text-blue-700 md:block md:text-2xl'>
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
