import Link from 'next/link';

const Nav = () => {
  return (
    <nav className='flex justify-between border-b-2 py-6 px-10 mb-10'>
      <Link href='/'>
        <h2 className='text-3xl font-black cursor-pointer text-blue-700'>
          SmartFasion
        </h2>
      </Link>
      <div>
        <Link href='/login'>
          <button className='mx-3 px-4 py-1 hidden sm:inline'>Login</button>
        </Link>
        <Link href='/register'>
          <button className='mx-3 px-4 py-1 rounded-full bg-blue-700 text-white shadow-sm'>
            Register
          </button>
        </Link>
      </div>
    </nav>
  );
};
export default Nav;
