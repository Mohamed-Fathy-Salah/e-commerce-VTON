const CartSummary = () => {
  return (
    <>
      <div className='flex flex-col gap-4 bg-gray-200 p-4'>
        <h2 className='border-b border-gray-300 pb-2 font-semibold'>
          Order Summary
        </h2>
        <div className='space-y-1 border-b border-gray-300 pb-4'>
          <div className='flex justify-between'>
            <h3>Subtotal</h3>
            <h3 className='font-meduim'>144 EGP</h3>
          </div>
          <div className='flex justify-between'>
            <h3>Shipping</h3>
            <h3 className='font-meduim'>Free</h3>
          </div>
        </div>
        <div className='flex justify-between pb-2'>
          <h3>Total</h3>
          <h3 className='font-meduim'>418 EGP</h3>
        </div>
      </div>
      <button className='my-2 w-full rounded-md bg-blue-700 px-6 py-4 text-white'>
        Checkout
      </button>
    </>
  );
};
export default CartSummary;
