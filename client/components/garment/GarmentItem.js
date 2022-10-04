import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Modal from '../utils/Modal';

const GarmentItem = ({ garment }) => {
  const router = useRouter();
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  const handelDeleteGarment = async () => {
    const res = await axios.delete(`/api/garments/${garment.id}`);
    setConfirmDeleteModal(false);
    console.log(res);
  };

  return (
    <>
      <Modal
        isOpen={confirmDeleteModal}
        setIsOpen={setConfirmDeleteModal}
        description={
          <div className='flex flex-col items-center gap-5'>
            <h3 className='text-lg font-bold'>
              Confirm the deletion of the item
            </h3>
            <div>
              <button
                className='mx-2 rounded-full bg-gray-200 px-6 py-2 text-gray-700 hover:bg-opacity-90'
                onClick={() => setConfirmDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className='mx-2 rounded-full bg-red-600 px-6 py-2 text-white hover:bg-opacity-90'
                onClick={handelDeleteGarment}
              >
                Confirm
              </button>
            </div>
          </div>
        }
      />

      <div className='group relative flex w-60 cursor-pointer flex-col items-center rounded bg-white p-6 text-center shadow-sm transition-all duration-200 hover:border'>
        <div className='absolute top-1/2 z-50 hidden h-full w-full -translate-y-1/2 flex-col items-center justify-center gap-4 bg-gray-50 bg-opacity-50 backdrop-blur-sm group-hover:flex'>
          <button
            className='rounded-full bg-blue-700 p-4 text-gray-50 transition-transform hover:scale-105'
            onClick={() => router.push(`/garment/${garment.id}`)}
          >
            <EyeIcon className='h-6 w-6' />
          </button>
          <button
            className='rounded-full bg-blue-700 p-4 text-gray-50 transition-transform hover:scale-105'
            onClick={() => router.push(`/admin/edit/${garment.id}`)}
          >
            <PencilIcon className='h-6 w-6' />
          </button>
          <button
            className='rounded-full bg-blue-700 p-4 text-gray-50 transition-transform hover:scale-105'
            onClick={() => setConfirmDeleteModal(true)}
          >
            <TrashIcon className='h-6 w-6' />
          </button>
        </div>
        <img
          layout='intrinsic'
          className='w-full rounded object-contain'
          src={'data:image;base64,' + garment.frontPhoto}
        />
        <Link href={'/garment/' + garment.id}>
          <h2 className='cursor-pointer text-lg font-semibold text-gray-600'>
            {garment.name?.substr(0, 15)}...
          </h2>
        </Link>
        <h3 className='my-2 text-2xl text-blue-700'>{garment.price} EGP</h3>
        <table className='my-2 w-2/3 border border-gray-300'>
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
    </>
  );
};
export default GarmentItem;
