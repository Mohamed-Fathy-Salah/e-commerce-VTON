import Layout from '../../components/Layout';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Orders from '../../components/admin/Orders';
import Garments from '../../components/admin/Garments';

const dashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <Layout user={user} home>
      <nav className='flex flex-col items-center justify-center gap-4 md:flex-row'>
        <div className='relative flex w-1/2 rounded-full bg-gray-200 py-2 text-gray-600'>
          <div
            className={`z-10 w-1/2 cursor-pointer text-center ${
              activeTab === 'orders' && ' text-gray-100'
            }`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </div>
          <div
            className={`z-10 w-1/2 cursor-pointer text-center ${
              activeTab === 'garments' && ' text-gray-100'
            }`}
            onClick={() => setActiveTab('garments')}
          >
            Garments
          </div>
          <div
            className={`absolute top-0 bottom-0 z-0 w-1/2 cursor-pointer rounded-full bg-blue-700 text-center shadow-md ${
              activeTab === 'orders' ? ' left-0' : 'right-0'
            }`}
          ></div>
        </div>
        <div className='flex w-1/2 cursor-pointer items-center justify-center gap-1 rounded-full border border-blue-700 py-2 px-6 text-blue-700 transition duration-200 hover:bg-blue-700 hover:text-gray-100 md:w-auto'>
          <PlusIcon className='h-4 w-4' /> Add New Garment
        </div>
      </nav>
      <section>
        {activeTab === 'orders' && <Orders />}
        {activeTab === 'garments' && <Garments />}
      </section>
    </Layout>
  );
};
export default dashboard;
