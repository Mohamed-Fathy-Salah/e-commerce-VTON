import CartItem from './CartItem';

const CartTable = () => {
  return (
    <table className='w-full'>
      <tbody>
        <tr className='border-b text-left font-normal'>
          <th className='pr-4 text-gray-500'>Item</th>
          <th className='pr-4 text-gray-500'>Price</th>
          <th className='pr-4 text-gray-500'>Quantity</th>
          <th className='pr-4 text-gray-500'>Total</th>
          <th></th>
        </tr>
        <CartItem />
        <CartItem />
        <CartItem />
      </tbody>
    </table>
  );
};
export default CartTable;
