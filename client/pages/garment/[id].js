import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../../components/Layout';
import axios from 'axios';
import Link from 'next/link';

const GarmentPage = ({ user, garment }) => {
  const router = useRouter();

  const avilableSizes = [
    {
      size: 's',
      stock: garment.small,
    },
    {
      size: 'm',
      stock: garment.medium,
    },
    {
      size: 'l',
      stock: garment.large,
    },
    {
      size: 'xl',
      stock: garment.xlarge,
    },
    {
      size: 'xxl',
      stock: garment.xxlarge,
    },
  ];

  const [activeTab, setActiveTab] = useState('m');

  const handleAddToCart = async () => {
    const data = {
      garmentId: garment.id,
      quantity: 1,
      price: garment.price,
      size: activeTab,
    };
    const res = axios.put('/api/cart');
    // router.push('cart')
    console.log(res);
  };

  return (
    <Layout user={user} home>
      <div className='flex flex-col justify-between lg:flex-row'>
        <div className='flex flex-col gap-10 py-5 px-5'>
          <div>
            <span className='rounded bg-gray-500 px-4 py-2 text-white'>
              {garment.small ||
              garment.medium ||
              garment.large ||
              garment.xlarge ||
              garment.xxlarge
                ? 'In Stock'
                : 'Out Of Stock'}
            </span>
          </div>
          <div>
            <h1 className=' text-6xl font-bold text-blue-700'>
              {garment.name}
            </h1>
            <h3 className='my-4 text-3xl'>{garment.price} EGP</h3>
          </div>
          <div className='block lg:hidden'>
            <Image
              className='max-w-2xl rounded-xl hover:opacity-75 '
              width={800}
              height={800}
              layout='intrinsic'
              src={'data:image;base64,' + garment.frontPhoto}
            />
          </div>
          <div>
            <div value={activeTab} className=' rounded-lg bg-gray-100 p-10'>
              <div className='mb-5 flex gap-4 sm:gap-6'>
                {avilableSizes.map((size) => (
                  <div
                    key={size.size}
                    className={`cursor-pointer select-none rounded bg-blue-100 px-5 py-2 text-xl font-bold transition-colors duration-200 ${
                      activeTab === size.size ? 'bg-blue-700 text-white' : ''
                    }`}
                    onClick={() => setActiveTab(size.size)}
                  >
                    {size.size?.toUpperCase()}
                  </div>
                ))}
              </div>
              <hr />
              <div className='mt-4 text-2xl'>
                {avilableSizes.find((size) => size.size === activeTab).stock} In
                stock
              </div>
            </div>
          </div>
          <div className='end mt-10 flex items-start gap-3'>
            <button
              onClick={handleAddToCart}
              className='my-2 rounded-full bg-blue-700 px-6 py-4 text-white'
            >
              Add To Card
            </button>{' '}
            <button className=' my-2 rounded-full bg-slate-900 px-6 py-4 text-white'>
              Try On
            </button>
          </div>
        </div>
        <div className='hidden pr-5 lg:block'>
          <Image
            className=' max-w-2xl rounded-xl object-cover hover:opacity-75 '
            width={800}
            height={800}
            layout='intrinsic'
            src={'data:image;base64,' + garment.frontPhoto}
          />
        </div>
      </div>
    </Layout>
  );
};

// export const getStaticPaths = async () => {
//   // const { data } = await axios.get('/api/garments');
//   // const paths = data.map((gar) => ({
//   //   params: {
//   //     garment: gar.id,
//   //   },
//   // }));
//   return {
//     paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
//     fallback: 'blocking',
//   };
// };

GarmentPage.getInitialProps = async (context, client) => {
  const { id } = context.query;
  const { data } = await client.get(`/api/garments/garment/${id}`);

  if (!data)
    return {
      garment: null,
    };

  return {
    garment: data,
  };
};

export default GarmentPage;
