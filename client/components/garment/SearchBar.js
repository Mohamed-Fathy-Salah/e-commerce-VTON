const SearchBar = ({ search, setSearch }) => {
  return (
    <div className='mx-auto mt-16 mb-8 lg:px-16'>
      <div className='p-5 md:p-10'>
        <label
          htmlFor='price'
          className='mx-auto mb-5 block text-center text-2xl font-bold text-blue-700 sm:mb-10 md:text-3xl'
        >
          Whate are you buying today?
        </label>
        <input
          type='text'
          name='price'
          id='price'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='block w-full rounded-md border-2 px-4 py-2 text-lg shadow-sm'
          placeholder='search here ...'
        />
      </div>
    </div>
  );
};
export default SearchBar;
