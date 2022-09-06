import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import Link from 'next/link';

const Modal = ({ isOpen, setIsOpen }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className='relative z-50'
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

      {/* Full-screen container to center the panel */}
      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <Dialog.Panel className='mx-auto max-w-md rounded bg-white p-16'>
          <Dialog.Title className='text-center text-lg font-semibold'>
            This item has been added to your cart successfully
          </Dialog.Title>
          <Dialog.Description className='mt-10 flex flex-col justify-center gap-4'>
            <Link href='/'>
              <button className='rounded-md bg-blue-700 py-1 px-3 text-white outline-none hover:opacity-90'>
                Continue Shopping
              </button>
            </Link>
            <Link href='/cart'>
              <button className='rounded-md bg-gray-200 py-1 px-3 outline-none hover:opacity-90'>
                Go To Cart
              </button>
            </Link>
          </Dialog.Description>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
export default Modal;
