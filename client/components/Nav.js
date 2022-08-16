const Nav = () => {
  return (
    <nav className='flex justify-between border-b-2 p-6'>
      <h2 className='text-3xl font-black cursor-pointer text-blue-700'>
        SmartFasion
      </h2>
      <div>
        <button className='mx-3 px-5 py-1 '>Login</button>
        <button className='mx-3 px-5 py-1 rounded-full bg-blue-700 text-white shadow-sm'>
          Register
        </button>
      </div>
    </nav>
  );
};
export default Nav;
