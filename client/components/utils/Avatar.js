const Avatar = ({ name, photo }) => {
  const nameArray = name.split(' ');
  const placehoder =
    nameArray[0].charAt(0) + (nameArray.length > 1 && nameArray[1].charAt(0));

  return (
    <>
      {photo ? (
        <img
          src={'data:image;base64,' + photo}
          alt='profile photo'
          className='h-12 w-12 rounded-md object-cover sm:h-8 sm:w-8'
        />
      ) : (
        <div className='flex h-12 w-12 items-center justify-center rounded-md text-lg font-bold text-gray-500 sm:mr-2 sm:h-8 sm:w-8 sm:bg-gray-200 sm:text-sm'>
          {placehoder}
        </div>
        //  <UserIcon className='h-6 w-6 rounded-md text-gray-500 sm:mr-2 sm:h-8 sm:w-8 sm:bg-gray-200 sm:p-2' />
      )}
    </>
  );
};
export default Avatar;
