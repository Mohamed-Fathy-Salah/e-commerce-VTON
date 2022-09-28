import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import Layout from '../layout/Layout';

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const activeTab = router.asPath.split('/').pop();

  return (
    <Layout home user={user}>
      <nav className='flex items-center justify-center gap-4 '>
        <div className='relative flex w-2/3 rounded-full bg-gray-200 py-2 text-gray-600'>
          <div
            className={`z-10 w-1/2 cursor-pointer text-center ${
              activeTab === 'orders' && ' text-gray-100'
            }`}
            onClick={() =>
              router.push('/admin/dashboard/orders', (scroll = false))
            }
          >
            Orders
          </div>
          <div
            className={`z-10 w-1/2 cursor-pointer text-center ${
              activeTab === 'garments' && ' text-gray-100'
            }`}
            onClick={() => router.push('/admin/dashboard/garments')}
          >
            Garments
          </div>
          <div
            className={`absolute top-0 bottom-0 z-0 w-1/2 cursor-pointer rounded-full bg-blue-700 text-center shadow-md ${
              activeTab === 'orders' ? ' left-0' : 'right-0'
            }`}
          ></div>
        </div>
        <Link href='/admin/add-garment' passHref>
          <button className='flex cursor-pointer items-center justify-center gap-1 rounded-full border border-blue-700 p-2 text-blue-700 transition duration-200 hover:bg-blue-700 hover:text-gray-100'>
            <PlusIcon className='h-4 w-4' />
            <span className='hidden md:inline'>Add New Garment</span>
          </button>
        </Link>
      </nav>
      {children}
    </Layout>
  );
};
export default DashboardLayout;
