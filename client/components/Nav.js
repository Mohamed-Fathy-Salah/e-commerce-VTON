import Link from 'next/link';

const Nav = () => {
  return (
    <nav className='mb-10 flex justify-between border-b-2 py-6 px-10'>
      <Link href='/'>
        <h2 className='cursor-pointer text-3xl font-black text-blue-700'>
          SmartFasion
        </h2>
      </Link>
      <div>
        <Link href='/login'>
          <button className='mx-3 hidden px-4 py-1 sm:inline'>Login</button>
        </Link>
        <Link href='/register'>
          <button className='mx-3 rounded-full bg-blue-700 px-4 py-1 text-white shadow-sm'>
            Register
          </button>
        </Link>
      </div>
    </nav>
  );
};
export default Nav;
