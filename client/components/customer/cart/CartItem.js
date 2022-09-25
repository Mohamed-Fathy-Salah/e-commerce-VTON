import { XMarkIcon } from '@heroicons/react/24/outline';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../../context/CartContext';

const CartItem = ({ garment, setCart, cart, updatels }) => {
  const { updateCartItemsCount } = useContext(CartContext);

  const [itemQnt, setItemQnt] = useState(() =>
    JSON.parse(localStorage.getItem('cart-' + garment.id))
  );

  const handleQntChange = (e) => {
    setItemQnt({
      ...itemQnt,
      [e.target.id]:
        Number(e.target.value) <= garment[e.target.id] &&
        Number(e.target.value),
    });
  };

  useEffect(() => {
    localStorage.setItem(`cart-${garment.id}`, JSON.stringify(itemQnt));
    updatels((x) => x + 1);
  }, [itemQnt]);

  const handelItemDelete = () => {
    setCart(cart.filter((item) => item.id !== garment.id));
    localStorage.removeItem('cart-' + garment.id);
    updateCartItemsCount();
  };

  return (
    <tr className='border-b text-sm md:text-base'>
      <td className='py-4 pr-4'>
        <div className='inline-flex'>
          <img
            className=' object-contain'
            width={100}
            height={100}
            src={'data:image;base64,' + garment.frontPhoto}
          />
          <div className='p-4 text-gray-700'>
            <h4 className='font-semibold'>{garment.name}</h4>
            <span className='font-medium'>{garment.garmentClass}</span>
          </div>
        </div>
      </td>
      <td className='pr-4'>{garment.price} EGP</td>
      <td className='py-3 pr-4'>
        <div className='space-y-2'>
          <div className='flex items-center justify-between gap-2'>
            <label className='text-sm text-gray-600' htmlFor='small'>
              S:
            </label>
            <input
              className='w-10 px-2 py-1'
              type='number'
              id='small'
              placeholder='S'
              value={itemQnt.small}
              onChange={handleQntChange}
            />
          </div>
          <div className='flex items-center justify-between gap-2'>
            <label className='text-sm text-gray-600' htmlFor='medium'>
              M:
            </label>
            <input
              className='w-10 px-2 py-1'
              type='number'
              id='medium'
              placeholder='M'
              value={itemQnt.medium}
              onChange={handleQntChange}
            />
          </div>
          <div className='flex items-center justify-between gap-2'>
            <label className='text-sm text-gray-600' htmlFor='large'>
              L:
            </label>
            <input
              className='w-10 px-2 py-1'
              type='number'
              id='large'
              placeholder='L'
              value={itemQnt.large}
              onChange={handleQntChange}
            />
          </div>
          <div className='flex items-center justify-between gap-2'>
            <label className='text-sm text-gray-600' htmlFor='xlarge'>
              XL:
            </label>
            <input
              className='w-10 px-2 py-1'
              type='number'
              id='xlarge'
              placeholder='XL'
              value={itemQnt.xlarge}
              onChange={handleQntChange}
            />
          </div>
          <div className='flex items-center justify-between gap-2'>
            <label className='text-sm text-gray-600' htmlFor='xxlarge'>
              XXL:
            </label>
            <input
              className='w-10 px-2 py-1'
              type='number'
              id='xxlarge'
              placeholder='XXL'
              value={itemQnt.xxlarge}
              onChange={handleQntChange}
            />
          </div>
        </div>
      </td>
      <td className='pr-4'>
        {(itemQnt.small +
          itemQnt.medium +
          itemQnt.large +
          itemQnt.xlarge +
          itemQnt.xxlarge) *
          garment.price}{' '}
        EGP
      </td>
      <td className='pr-4'>
        <XMarkIcon
          onClick={handelItemDelete}
          className='h-6 w-6 cursor-pointer rounded-full bg-gray-200 p-1.5 transition duration-200 hover:bg-red-600 hover:text-white'
        />
      </td>
    </tr>
  );
};
export default CartItem;
