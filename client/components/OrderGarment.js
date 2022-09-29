const OrderGarment = ({ garment }) => {
  console.log(garment);
  return (
    <div className='mt-3 flex flex-col justify-between gap-1 md:flex-row md:items-center'>
      <h3>
        <span className='font-semibold'>Garment Id: </span>
        {garment.garmentId}
      </h3>
      <div className='flex  gap-2 '>
        {Number(garment.small) ? (
          <span className='rounded-md bg-gray-200 px-2'>
            S: {garment.small}
          </span>
        ) : (
          ''
        )}
        {Number(garment.medium) ? (
          <span className='rounded-md bg-gray-200 px-2'>
            M: {garment.medium}
          </span>
        ) : (
          ''
        )}
        {Number(garment.large) ? (
          <span className='rounded-md bg-gray-200 px-2'>
            L: {garment.large}
          </span>
        ) : (
          ''
        )}
        {Number(garment.xlarge) ? (
          <span className='rounded-md bg-gray-200 px-2'>
            XL: {garment.xlarge}
          </span>
        ) : (
          ''
        )}
        {Number(garment.xxlarge) ? (
          <span className='rounded-md bg-gray-200 px-2'>
            XXL: {garment.xxlarge}
          </span>
        ) : (
          ''
        )}
      </div>
      <span className='font-semibold text-green-700'>
        Item Price: {garment.price}
      </span>
    </div>
  );
};
export default OrderGarment;
