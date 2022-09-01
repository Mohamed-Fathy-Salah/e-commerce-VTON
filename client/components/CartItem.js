import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const CartItem = () => {
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
            src='https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
          />
          <div className='p-4 text-gray-700'>
            <h4 className='font-semibold'>Basic White Tshirt</h4>
            <span className='font-medium'>T-shirt - XL</span>
          </div>
        </div>
      </td>
      <td className='pr-4'> 130 EGP</td>
      <td className='pr-4'>
        <input
          className='w-16 px-2 py-1'
          type='number'
          value={itemQnt}
          onChange={handleQntChange}
        />
      </td>
      <td className='pr-4'> 260 EGP</td>
      <td className='pr-4'>
        <XMarkIcon className='h-6 w-6 cursor-pointer rounded-full bg-gray-200 p-1.5 transition duration-200 hover:bg-red-600 hover:text-white' />
      </td>
    </tr>
  );
};
export default CartItem;
