const SearchBar = () => {
  return (
    <div className='mx-auto my-16 rounded-lg lg:px-8'>
      <div className='flex flex-col items-center justify-center p-10'>
        <label
          htmlFor='price'
          className='mx-auto mb-5 block text-lg font-bold text-gray-700 sm:mb-10 sm:text-3xl '
        >
          Whate are you buying today?
        </label>
        <input
          type='text'
          name='price'
          id='price'
          className='text-md block w-full rounded-full border-2 bg-transparent px-7 py-2 text-lg sm:ml-10 sm:w-full sm:py-3'
          placeholder='search here ...'
        />
      </div>
    </div>
  );
};
export default SearchBar;
