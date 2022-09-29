const NotAuthorized = () => {
  return (
    <div className=' flex h-screen items-center justify-center px-40'>
      <h3 className='rounded-md bg-gray-200 py-6 px-8 text-center text-4xl font-medium text-red-600'>
        You are not authorized to access this page
        <Link href='/'>
          <a className='mt-4 block text-lg text-gray-700 underline'>
            Return to home screen
          </a>
        </Link>
      </h3>
    </div>
  );
};
export default NotAuthorized;
