import Link from 'next/link';

const Logo = ({ size }) => {
  return (
    <Link href='/'>
      <h2
        className={` select-none font-black cursor-pointer text-blue-700 ${
          !size ? 'text-3xl' : size
        }`}
      >
        SmartFasion
      </h2>
    </Link>
  );
};
export default Logo;
