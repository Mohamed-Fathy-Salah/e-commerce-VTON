import { XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../../context/CartContext';
import Modal from '../../utils/Modal';
import NumInput from '../../utils/NumInput';

const SizeElem = ({ size, label }) => {
  return Number(size) ? (
    <div className='rounded bg-gray-200 px-2'>
      <span className=''>{label}:</span>
      {size}
    </div>
  ) : (
    ''
  );
};

const sizes = [
  {
    label: 'S',
    size: 'small',
  },
  {
    label: 'M',
    size: 'medium',
  },
  {
    label: 'L',
    size: 'large',
  },
  {
    label: 'XL',
    size: 'xlarge',
  },
  {
    label: 'XXL',
    size: 'xxlarge',
  },
];

const CartItem = ({ garment, setCart, cart, updatels }) => {
  const router = useRouter();
  const { deleteCartItem } = useContext(CartContext);

  const [editQtyModal, setEditQtyModal] = useState(false);
  const [itemQty, setItemQty] = useState(() =>
    JSON.parse(localStorage.getItem('cart-' + garment.id))
  );

  const handleQtyChange = (label, value) => {
    setItemQty({
      ...itemQty,
      [label]: value,
    });
  };

  useEffect(() => {
    localStorage.setItem(`cart-${garment.id}`, JSON.stringify(itemQty));
    updatels((x) => x + 1);
  }, [itemQty]);

  const handelItemDelete = () => {
    setCart(cart.filter((item) => item.id !== garment.id));
    deleteCartItem(garment.id);
  };

  return (
    <>
      <Modal
        isOpen={editQtyModal}
        setIsOpen={setEditQtyModal}
        title='Update Quantity'
        description={
          <div className='mt-10 flex flex-col gap-2'>
            {sizes.map((size) => (
              <div className='flex items-center justify-end gap-4'>
                <label className='text-gray-600'>{size.label}</label>
                <NumInput
                  value={itemQty[size.size]}
                  onChange={(val) => handleQtyChange(size.size, val)}
                  max={garment[size.size]}
                />
              </div>
            ))}
            <button
              className='mt-5 w-full rounded-md bg-blue-700 p-2 text-white transition-opacity hover:bg-opacity-90'
              onClick={() => setEditQtyModal(false)}
            >
              Close
            </button>
          </div>
        }
      />

      <tr className='border-b text-sm md:text-base'>
        <td className='p-4 pr-28 lg:p-10'>
          <div className='inline-flex'>
            <img
              className='cursor-pointer object-contain'
              width={100}
              height={100}
              src={'data:image;base64,' + garment.frontPhoto}
              onClick={() => router.push(`/garment/${garment.id}`)}
            />
            <div className='p-4 text-gray-700 lg:px-10'>
              <h4
                className='cursor-pointer font-semibold hover:text-blue-700  hover:underline'
                onClick={() => router.push(`/garment/${garment.id}`)}
              >
                {garment.name}
              </h4>
              <span className='font-medium'>{garment.garmentClass}</span>
            </div>
          </div>
        </td>

        <td className='p-4 lg:px-10'>{garment.price} EGP</td>

        <td className='p-4 lg:px-10'>
          <div className='flex w-28 flex-wrap gap-1.5'>
            {sizes.map((size) => (
              <SizeElem size={itemQty[size.size]} label={size.label} />
            ))}
            <span
              className='cursor-pointer text-blue-700 hover:underline'
              onClick={() => setEditQtyModal(true)}
            >
              Edit
            </span>
          </div>
        </td>

        <td className='p-4 lg:px-10'>
          {sizes
            .map((size) => itemQty[size.size])
            .reduce((prev, curr) => prev + curr) * garment.price}{' '}
          EGP
        </td>

        <td className='p-4 lg:px-10'>
          <XMarkIcon
            onClick={handelItemDelete}
            className='h-8 w-8 cursor-pointer rounded-full bg-gray-200 p-2 transition duration-200 hover:bg-red-600 hover:text-white'
          />
        </td>
      </tr>
    </>
  );
};
export default CartItem;
