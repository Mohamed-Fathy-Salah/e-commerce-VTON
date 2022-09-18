import Link from 'next/link';

const GarmentItem = ({ garment }) => {
  return (
    <div className='flex w-60 flex-col items-center rounded bg-white p-4 text-center shadow-sm'>
      <img
        layout='intrinsic'
        objectFit='cover'
        className='w-full rounded object-contain'
        src={'data:image;base64,' + garment.frontPhoto}
      />
      <Link href={'/garment/' + garment.id} replace={true}>
        <h2 className='cursor-pointer text-lg font-semibold text-gray-600'>
          {garment.name}
        </h2>
      </Link>
      <h3 className='text-lg text-gray-500'>{garment.price} EGP</h3>
      <table className='my-2 w-2/3 border'>
        <tbody>
          <tr className='border-b font-normal'>
            <th className='border-r px-4 text-gray-500'>S</th>
            <th className='px-4 text-gray-500'>{garment.small}</th>
          </tr>
          <tr className='border-b font-normal'>
            <th className='border-r px-4 text-gray-500'>M</th>
            <th className='px-4 text-gray-500'>{garment.medium}</th>
          </tr>
          <tr className='border-b font-normal'>
            <th className='border-r px-4 text-gray-500'>L</th>
            <th className='px-4 text-gray-500'>{garment.large}</th>
          </tr>
          <tr className='border-b font-normal'>
            <th className='border-r px-4 text-gray-500'>XL</th>
            <th className='px-4 text-gray-500'>{garment.xlarge}</th>
          </tr>
          <tr className='border-b font-normal'>
            <th className='border-r px-4 text-gray-500'>XXL</th>
            <th className='px-4 text-gray-500'>{garment.xxlarge}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default GarmentItem;
