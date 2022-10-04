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

  return (
    <>
      <div className='p-8'>
        <div className='mx-auto flex max-w-screen-lg flex-col gap-4 rounded-md bg-gray-100 p-8 md:flex-row'>
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
            <option value='completed'>Completed</option>
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
        <section className='mx-auto my-8 max-w-screen-lg items-center justify-center'>
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
    </>
  );
};
export default Orders;
