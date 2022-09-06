import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import useSWR from 'swr';
import axios from 'axios';

const CartItem = ({ garment }) => {
  const [itemQnt, setItemQnt] = useState(1);

  const handleQntChange = (e) => {
    setItemQnt(e.target.value);
  };

  return (
    <tr className='border-b text-sm md:text-base'>
      <td className='py-4 pr-4'>
        <div className=' inline-flex'>
          <img
            className=' object-contain'
            width={100}
            height={100}
            src={'data:image;base64,' + garment.frontPhoto}
          />
          <div className='p-4 text-gray-700'>
            <h4 className='font-semibold'>{garment.name}</h4>
            <span className='font-medium'>
              {garment.garmentClass} -{' '}
              {(garment.small && 'S') ||
                (garment.medium && 'M') ||
                (garment.large && 'L') ||
                (garment.xlarge && 'XL') ||
                (garment.xxlarge && 'XXL')}
            </span>
          </div>
        </div>
      </td>
      <td className='pr-4'>{garment.price} EGP</td>
      <td className='pr-4'>
        <input
          className='w-16 px-2 py-1'
          type='number'
          value={itemQnt}
          onChange={handleQntChange}
        />
      </td>
      <td className='pr-4'>{itemQnt * garment.price} EGP</td>
      <td className='pr-4'>
        <XMarkIcon className='h-6 w-6 cursor-pointer rounded-full bg-gray-200 p-1.5 transition duration-200 hover:bg-red-600 hover:text-white' />
      </td>
    </tr>
  );
};
export default CartItem;
