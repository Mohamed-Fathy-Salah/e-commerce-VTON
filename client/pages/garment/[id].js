import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../../components/Layout';
import Modal from '../../components/utils/Modal';
import Link from 'next/link';

const GarmentPage = ({ user, garment }) => {
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    if (quantity >= 1) {
      const data = {
        small: activeTab === 's' ? quantity : 0,
        medium: activeTab === 'm' ? quantity : 0,
        large: activeTab === 'l' ? quantity : 0,
        xlarge: activeTab === 'xl' ? quantity : 0,
        xxlarge: activeTab === 'xxl' ? quantity : 0,
      };

      localStorage.setItem('cart-' + garment.id, JSON.stringify(data));
      setIsModalOpen(true);
    }
  };

  return (
    <Layout user={user} home>
      <div className='flex flex-col justify-between lg:flex-row'>
        <div className='flex flex-col gap-10 py-5 px-5'>
          <Modal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            title='This item has been added to your cart successfully'
            description={
              <>
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
              </>
            }
          />
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
              {garment.name || garment.garmentClass + '-' + garment.gender}
            </h1>
            {garment.description && (
              <p className='mt-4 max-w-lg text-gray-600'>
                {garment.description}
              </p>
            )}
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
                    className={`cursor-pointer select-none rounded  px-5 py-2 text-xl font-bold transition-colors duration-200 ${
                      activeTab === size.size
                        ? 'bg-blue-700 text-white'
                        : 'bg-blue-100 text-gray-700'
                    }`}
                    onClick={() => setActiveTab(size.size)}
                  >
                    {size.size?.toUpperCase()}
                  </div>
                ))}
              </div>
              <hr />
              <div className='mt-4 flex items-center justify-between text-xl'>
                <input
                  type='number'
                  placeholder='Qty...'
                  className={`w-24 py-2 ${
                    quantity < 1 && 'animate-pulse ring-1 ring-red-500'
                  }`}
                  min={1}
                  value={quantity}
                  onChange={(e) =>
                    e.target.value <
                      avilableSizes.find((size) => size.size === activeTab)
                        .stock && setQuantity(e.target.value)
                  }
                />
                <span className='text-gray-500'>
                  {avilableSizes.find((size) => size.size === activeTab).stock}{' '}
                  Avilable In stock
                </span>
              </div>
            </div>
          </div>
          <div className='end mt-10 flex items-start gap-3'>
            <button
              onClick={handleAddToCart}
              className='my-2 rounded-full bg-blue-700 px-6 py-4 text-white transition-opacity hover:opacity-90'
            >
              Add To Card
            </button>{' '}
            <button className='my-2 rounded-full bg-slate-900 px-6 py-4 text-white transition-opacity hover:opacity-90'>
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
