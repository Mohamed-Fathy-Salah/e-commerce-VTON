import CartItem from './CartItem';

const CartTable = ({ garments, setCart, cart, updatels }) => {
  const garmentRows = garments?.map((garment) => (
    <CartItem
      key={garment.id}
      garment={garment}
      setCart={setCart}
      updatels={updatels}
      cart={cart}
    />
  ));

  return (
    <table className='w-full overflow-x-auto'>
      <thead>
        <tr className='border-b text-left font-normal'>
          <th className='pr-4 text-gray-500'>Item</th>
          <th className='pr-4 text-gray-500'>Price</th>
          <th className='pr-4 text-gray-500'>Quantity</th>
          <th className='pr-4 text-gray-500'>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{garmentRows}</tbody>
    </table>
  );
};
export default CartTable;
