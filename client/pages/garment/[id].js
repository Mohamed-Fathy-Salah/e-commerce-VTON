import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import buildClient from '../../api/build-client';
import Layout from '../../components/Layout';
import Modal from '../../components/utils/Modal';
import AuthContext from '../../context/AuthContext';
import CartContext from '../../context/CartContext';

const GarmentPage = ({ garment }) => {
  const { user } = useContext(AuthContext);
  const { updateCartItemsCount } = useContext(CartContext);

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

  const handleAddToCart = async () => {
    const data = {
      small: activeTab === 's' ? 1 : 0,
      medium: activeTab === 'm' ? 1 : 0,
      large: activeTab === 'l' ? 1 : 0,
      xlarge: activeTab === 'xl' ? 1 : 0,
      xxlarge: activeTab === 'xxl' ? 1 : 0,
    };

    localStorage.setItem('cart-' + garment.id, JSON.stringify(data));
    setIsModalOpen(true);
    updateCartItemsCount();
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

// export async function getStaticPaths() {
//   const { data } = await axios.get(
//     'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/garments'
//   );
//   //   const client = buildClient(ctx);
//   //   const { data } = await client.get('/api/users/currentuser');
//   const paths = data.map((garment) => ({
//     params: {
//       id: garment.id,
//     },
//   }));

//   return {
//     paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
//     fallback: 'blocking',
//   };
// }

// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
//     fallback: 'blocking', // can also be true or 'blocking'
//   };
// }

export async function getServerSideProps(context) {
  const { id } = context.params;
  const client = buildClient(context);
  const { data } = await client.get(`/api/garments/garment/${id}`);

  if (!data)
    return {
      garment: null,
    };

  return {
    props: {
      garment: data,
    },
  };
}

export default GarmentPage;
