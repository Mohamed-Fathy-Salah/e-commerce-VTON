import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import {
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  PresentationChartLineIcon,
  TableCellsIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import CartContext from '../../context/CartContext';
import { useAdminData } from '../../hooks/useAdmin';
import { useCustomerData } from '../../hooks/useCustomer';
import Avatar from '../utils/Avatar';

const ProfileMenu = ({ user }) => {
  const router = useRouter();
  const { logout } = useContext(AuthContext);
  const { clearCart } = useContext(CartContext);

  const {
    data: profile,
    isError,
    isLoading,
  } = user.type === 'admin' ? useAdminData(user.id) : useCustomerData(user.id);

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Menu as='div' className='relative z-50 '>
      {({ open }) => (
        <>
          <Menu.Button className='focut:ring-offset-gray-100 flex h-12 w-full items-center justify-center rounded-md border-gray-300 bg-gray-200 text-sm font-medium text-gray-700 shadow-sm hover:bg-opacity-90 focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 sm:border sm:bg-white sm:p-2'>
            <Avatar photo={profile.data.photo} name={profile.data.name} />
            <p className='hidden font-medium sm:ml-2 sm:inline'>
              Hello {profile.data.name?.split(' ')[0]}
            </p>
            <ChevronDownIcon
              className='mr-1 ml-2 hidden h-4 w-4 sm:inline'
              aria-hidden='true'
            />
          </Menu.Button>

          <Transition
            show={open}
            enter='transition duration-100 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-75 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'
          >
            <Menu.Items
              className='absolute right-0 mt-2 w-56 origin-top divide-y divide-gray-100 rounded-md bg-white shadow-md ring-1 ring-blue-700 ring-opacity-5 focus:outline-none'
              static
            >
              <div className='py-1'>
                {user.type === 'admin' && (
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`flex cursor-pointer items-center px-4 py-2 text-sm ${
                          active ? 'bg-blue-700 text-white' : 'text-gray-700'
                        }`}
                        onClick={() => router.push('/admin/dashboard/orders')}
                      >
                        <PresentationChartLineIcon
                          className={`mr-3  h-5 w-5 ${
                            active ? ' text-white ' : 'text-gray-400'
                          }`}
                          arial-hidden='true'
                        />
                        Admin Dashboard
                      </a>
                    )}
                  </Menu.Item>
                )}

                {user.type === 'customer' && (
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`flex cursor-pointer items-center px-4 py-2 text-sm ${
                          active ? 'bg-blue-700 text-white' : 'text-gray-700'
                        }`}
                        onClick={() => router.push('/orders')}
                      >
                        <TableCellsIcon
                          className={`mr-3  h-5 w-5 ${
                            active ? ' text-white ' : 'text-gray-400'
                          }`}
                          arial-hidden='true'
                        />
                        Orders
                      </a>
                    )}
                  </Menu.Item>
                )}

                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`flex cursor-pointer items-center px-4 py-2 text-sm ${
                        active ? 'bg-blue-700 text-white' : 'text-gray-700'
                      }`}
                      onClick={() => router.push('/settings')}
                    >
                      <Cog6ToothIcon
                        className={`mr-3 h-5 w-5  ${
                          active ? ' text-white' : 'text-gray-400'
                        }`}
                        arial-hidden='true'
                      />
                      Settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`flex cursor-pointer items-center px-4 py-2 text-sm ${
                        active ? 'bg-red-700 text-white' : 'text-gray-700'
                      }`}
                      onClick={() => {
                        clearCart();
                        logout();
                      }}
                    >
                      <ArrowRightOnRectangleIcon
                        className={`mr-3 h-5 w-5  ${
                          active ? ' text-white' : 'text-gray-400'
                        }`}
                        arial-hidden='true'
                      />
                      Logout
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default ProfileMenu;
