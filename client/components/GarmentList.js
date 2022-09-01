import Image from 'next/image';
import GarmentCard from './GarmentCard';

const GarmentList = () => {
  return (
    <>
      <div className=' w-full'>
        <div className='max-w-2xl mx-auto py-8 px-4 sm:py-10 lg:max-w-7xl'>
          <div className='grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-10 lg:grid-cols-3  xl:gap-x-12'>
            <GarmentCard
              name='Nomad Tumbler'
              price='113 EGP'
              imgSrc='https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
            />
            <GarmentCard
              name='Nomad Tumbler'
              price='113 EGP'
              imgSrc='https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
            />
            <GarmentCard
              name='Nomad Tumbler'
              price='113 EGP'
              imgSrc='https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
            />
            <GarmentCard
              name='Nomad Tumbler'
              price='113 EGP'
              imgSrc='https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
            />
            <GarmentCard
              name='Nomad Tumbler'
              price='113 EGP'
              imgSrc='https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
            />
            <GarmentCard
              name='Nomad Tumbler'
              price='113 EGP'
              imgSrc='https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
            />
            <GarmentCard
              name='Nomad Tumbler'
              price='113 EGP'
              imgSrc='https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
            />
            <GarmentCard
              name='Nomad Tumbler'
              price='113 EGP'
              imgSrc='https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default GarmentList;
