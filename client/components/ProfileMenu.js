import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, UserIcon } from '@heroicons/react/24/outline';
import {
  Cog6ToothIcon,
  PresentationChartLineIcon,
  ArrowRightOnRectangleIcon,
  TableCellsIcon,
} from '@heroicons/react/24/solid';

const ProfileMenu = ({ user }) => {
  const router = useRouter();
  // const endPoint =
  //   user.type === 'admin'
  //     ? `/api/admindata/${user.id}`
  //     : `/api/customerdata/${user.id}`;

  // const { data, error } = useSWR(endPoint, (url) =>
  //   axios
  //     .get(
  //       'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local' + url
  //     )
  //     .then((res) => res.data)
  // );

  // console.log(data, error);

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  const handleLogout = async () => {
    const res = await axios.post('/api/users/signout');
    console.log(res);
    router.push('/');
  };

  return (
    <Menu as='div' className='relative'>
      {({ open }) => (
        <>
          <Menu.Button className='focut:ring-offset-gray-100 inline-flex w-full items-center justify-center rounded-md border-gray-300 bg-gray-200 p-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 sm:border sm:bg-white sm:p-2'>
            {/* <Image /> */}
            <UserIcon className='h-6 w-6 rounded-md text-gray-500 sm:mr-2 sm:h-8 sm:w-8 sm:bg-gray-200 sm:p-2' />
            {/* <p className='hidden sm:inline'>Hello {data.name}</p> */}
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
                        onClick={() => router.push('/admin/dashboard')}
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
                        onClick={() => router.push('/customer/orders')}
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
                      onClick={() => router.push('/admin/settings')}
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
                      onClick={handleLogout}
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
