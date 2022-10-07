import CartItem from './CartItem';

const CartTable = ({ cart, setCart, updatels }) => {
  const garmentRows = cart?.map((garment) => (
    <CartItem
      key={garment.id}
      garment={garment}
      updatels={updatels}
      cart={cart}
      setCart={setCart}
    />
  ));

  return (
    <table className='w-full border-collapse'>
      <thead>
        <tr className='border-b text-left'>
          <th className='px-10 font-bold text-blue-700 lg:px-12'>Item</th>
          <th className='px-4 font-bold text-blue-700 lg:px-10'>Price</th>
          <th className='px-4 font-bold text-blue-700 lg:px-10'>Quantity</th>
          <th className='px-4 font-bold text-blue-700 lg:px-10'>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{garmentRows}</tbody>
    </table>
  );
};
export default CartTable;
