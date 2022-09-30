import Image from 'next/image';

const Avatar = ({ name, image }) => {
  const nameArray = name.split(' ');
  const placehoder =
    nameArray[0].charAt(0) + (nameArray.length > 1 && nameArray[1].charAt(0));

  return (
    <>
      {image ? (
        <Image src={image} alt='profile image' />
      ) : (
        <div className='flex items-center justify-center rounded-md text-lg font-bold text-gray-500 sm:mr-2 sm:h-8 sm:w-8 sm:bg-gray-200 sm:text-sm'>
          {placehoder}
        </div>
        // <UserIcon className='h-6 w-6 rounded-md text-gray-500 sm:mr-2 sm:h-8 sm:w-8 sm:bg-gray-200 sm:p-2' />
      )}
    </>
  );
};
export default Avatar;
