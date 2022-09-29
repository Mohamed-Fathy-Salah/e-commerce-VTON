import { Dialog } from '@headlessui/react';

const Modal = ({ isOpen, setIsOpen, title, description }) => {
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
          {title && (
            <Dialog.Title className='text-center text-lg font-semibold'>
              {title}
            </Dialog.Title>
          )}
          <Dialog.Description className='mt-2 flex flex-col justify-center gap-4'>
            {description}
          </Dialog.Description>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
export default Modal;
