const Nav = () => {
  return (
    <nav className='flex justify-between border-b-2 py-6 px-10 mb-10'>
      <h2 className='text-3xl font-black cursor-pointer text-blue-700'>
        SmartFasion
      </h2>
      <div>
        <button className='mx-3 px-4 py-1 hidden sm:inline'>Login</button>
        <button className='mx-3 px-4 py-1 rounded-full bg-blue-700 text-white shadow-sm'>
          Register
        </button>
      </div>
    </nav>
  );
};
export default Nav;
