const OrderGarment = ({ order }) => {
  console.log(order);
  return (
    <div className='mt-3 flex flex-col justify-between gap-1 md:flex-row md:items-center'>
      <h3>
        <span className='font-semibold'>Garment Id: </span>
        {order.garmentId}
      </h3>
      <div className='flex  gap-2 '>
        {Number(order.small) ? (
          <span className='rounded-md bg-gray-200 px-2'>S: {order.small}</span>
        ) : (
          ''
        )}
        {Number(order.medium) ? (
          <span className='rounded-md bg-gray-200 px-2'>M: {order.medium}</span>
        ) : (
          ''
        )}
        {Number(order.large) ? (
          <span className='rounded-md bg-gray-200 px-2'>L: {order.large}</span>
        ) : (
          ''
        )}
        {Number(order.xlarge) ? (
          <span className='rounded-md bg-gray-200 px-2'>
            XL: {order.xlarge}
          </span>
        ) : (
          ''
        )}
        {Number(order.xxlarge) ? (
          <span className='rounded-md bg-gray-200 px-2'>
            XXL: {order.xxlarge}
          </span>
        ) : (
          ''
        )}
      </div>
      <span className='font-semibold text-green-700'>
        Item Price: {order.price}
      </span>
    </div>
  );
};
export default OrderGarment;
