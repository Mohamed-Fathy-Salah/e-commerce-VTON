import Image from 'next/image';
import { useState } from 'react';

const PhotosGroup = ({ images, front, back }) => {
  const [currentPhoto, setCurrentPhoto] = useState(() =>
    images.length > 0 ? images[0] : front ? front : back
  );

  console.log(images);

  return (
    <div className='flex max-w-2xl flex-col gap-2'>
      <div>
        <Image
          //   src={currentPhoto}
          src={'data:image;base64,' + currentPhoto}
          alt='test'
          className='rounded-xl hover:opacity-75 '
          width={800}
          height={800}
          objectFit='cover'
        />
      </div>
      {images.length > 0 ? (
        <div className='flex items-center gap-2 overflow-x-auto rounded-lg'>
          {images.map((image) => (
            <img
              // src={image}
              src={'data:image;base64,' + image}
              alt='product photo'
              className={`cursor-pointer rounded-xl hover:opacity-75 ${
                currentPhoto === image ? '  ' : ''
              }`}
              width={80}
              height={80}
              objectFit='cover'
              onClick={() => setCurrentPhoto(image)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default PhotosGroup;
