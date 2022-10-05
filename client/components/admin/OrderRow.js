import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import OrderGarment from './OrderGarment';

const OrderRow = ({ order, userType }) => {
  let statusColor = '';

  if (order.status === 'created' || order.status === 'awaiting') {
    statusColor =
      'border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white';
  } else if (order.status === 'completed') {
    statusColor =
      'border-green-600 text-green-600 hover:bg-green-600 hover:text-white';
  } else {
    statusColor =
      'border-red-600 text-red-600 hover:bg-red-600 hover:text-white';
  }

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`flex w-full items-center justify-between border-b border-gray-200 bg-gray-100 p-5 first:rounded-t-md last:rounded-b-md `}
          >
            <div className='flex gap-6'>
              <h3 className=' text-left md:w-72'>
                <span className='hidden  font-semibold md:inline'>
                  Order Id:
                </span>
                {userType === 'customer' ? order.id : order.orderId}
              </h3>
              <h3
                className={`rounded-full border px-3 transition-colors duration-300 ${statusColor} flex items-center justify-center`}
              >
                {order.status}
              </h3>
            </div>
            <ChevronRightIcon
              className={`h-5 w-5 ${open ? 'rotate-90 transform' : ''}`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className={`mb-3 p-5`}>
            <OrderGarment order={order} userType={userType} />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
export default OrderRow;
