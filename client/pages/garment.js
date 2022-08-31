import { useState } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';

const avilableSizes = [
  {
    size: 's',
    stock: 12,
  },
  {
    size: 'm',
    stock: 13,
  },
  {
    size: 'l',
    stock: 6,
  },
  {
    size: 'xl',
    stock: 5,
  },
  {
    size: 'xxl',
    stock: 17,
  },
];

const GarmentPage = () => {
  const [activeTab, setActiveTab] = useState('m');
  return (
    <Layout home>
      <div className='flex flex-col lg:flex-row justify-between'>
        <div className='flex flex-col py-5 px-5 gap-10'>
          <div>
            <span className='bg-gray-500 px-4 py-2 rounded text-white'>
              In Stock
            </span>
          </div>
          <div>
            <h1 className=' text-6xl font-bold text-blue-700'>
              Basic White Tshirt
            </h1>
            <h3 className='my-4 text-3xl'>130.00 EGP</h3>
          </div>
          <div className='block lg:hidden'>
            <Image
              className='rounded-xl max-w-2xl hover:opacity-75 '
              width={800}
              height={800}
              layout='intrinsic'
              src='https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
            />
          </div>
          <div>
            <div value={activeTab} className=' bg-gray-100 rounded-lg p-10'>
              <div className='flex gap-4 mb-5 sm:gap-6'>
                {avilableSizes.map((size) => (
                  <div
                    key={size.size}
                    className={`text-xl select-none px-5 py-2 font-bold bg-blue-100 rounded cursor-pointer transition-colors duration-200 ${
                      activeTab === size.size ? 'bg-blue-700 text-white' : ''
                    }`}
                    onClick={() => setActiveTab(size.size)}
                  >
                    {size.size?.toUpperCase()}
                  </div>
                ))}
              </div>
              <hr />
              <div className='text-2xl mt-4'>
                {avilableSizes.find((size) => size.size === activeTab).stock} In
                stock
              </div>
            </div>
          </div>
          <div className='mt-10 flex gap-3 items-start end'>
            <button className='bg-blue-700 text-white px-6 py-4 my-2 rounded-full'>
              Add To Card
            </button>
            <button className=' bg-slate-900 text-white px-6 py-4 my-2 rounded-full'>
              Try On
            </button>
          </div>
        </div>
        <div className='hidden lg:block pr-5'>
          <Image
            className=' rounded-xl max-w-2xl hover:opacity-75 object-cover '
            width={800}
            height={800}
            layout='intrinsic'
            src='https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
          />
        </div>
      </div>
    </Layout>
  );
};
export default GarmentPage;
