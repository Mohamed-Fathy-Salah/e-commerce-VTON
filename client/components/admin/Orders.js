const Orders = () => {
  return (
    <div className='my-16 px-16'>
      <div className='space-y-16 bg-gray-100 p-8'>
        <div className='flex flex-col gap-4 border-b pb-8 md:flex-row'>
          <select className='max-w-sm'>
            <option value=''>Order Status</option>
            <option value='cancelled'>Cancelled</option>
            <option value='awaiting'>Awaiting</option>
            <option value='complete'>Complete</option>
          </select>
          <input type='text' placeholder='search by order id' />
        </div>
        <div>
          <table className='w-full'>
            <tbody>
              <tr className='bg-gray-200 text-left font-normal'>
                <th className='px-4 text-gray-500'>Order Id</th>
                <th className='hidden px-4 text-gray-500 md:inline'>
                  Garments
                </th>
                <th className='px-4 text-gray-500'>Status</th>
                <th className='px-4 text-gray-500'>Total</th>
                <th className='hidden px-4 text-gray-500 md:inline'>Created</th>
                <th className='hidden px-4 text-gray-500 md:inline'>
                  Last update
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Orders;
