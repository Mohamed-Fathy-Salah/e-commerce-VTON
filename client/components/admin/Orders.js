import { useEffect, useState } from 'react';
import OrderRow from '../OrderRow';

const Orders = ({ orders }) => {
  const [filteredStatusOrders, setFilteredStatusOrders] = useState(orders);
  const [filteredOrders, setFilteredOrders] = useState(filteredStatusOrders);
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    if (!searchFilter || searchFilter.length < 0) {
      setFilteredOrders(filteredStatusOrders);
    }
  }, [filteredStatusOrders]);

  console.log(filteredOrders);
  return (
    <div className='my-16 px-16'>
      <div className='space-y-16 p-8'>
        <div className='flex flex-col gap-4 border-b pb-8 md:flex-row'>
          <select
            className='max-w-sm'
            onChange={(e) => {
              setFilteredStatusOrders(
                e.target.value === 'all'
                  ? orders
                  : orders.filter((order) => order.status === e.target.value)
              );
            }}
          >
            <option value='all'>All</option>
            <option value='created'>Created</option>
            <option value='cancelled'>Cancelled</option>
            <option value='awaiting'>Awaiting</option>
            <option value='complete'>Complete</option>
          </select>
          <input
            type='text'
            placeholder='search by order id'
            value={searchFilter}
            onChange={(e) => {
              setSearchFilter(e.target.value);
              setFilteredOrders(
                e.target.value.length > 0
                  ? filteredStatusOrders.filter((order) =>
                      order.id.includes(e.target.value)
                    )
                  : filteredStatusOrders
              );
            }}
          />
        </div>
        <section className='mx-auto w-full max-w-4xl items-center justify-center p-10'>
          {filteredOrders.length ? (
            filteredOrders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))
          ) : (
            <div className='flex items-center justify-center text-xl text-gray-400'>
              No Orders
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
export default Orders;
