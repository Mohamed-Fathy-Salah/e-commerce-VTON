import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SuccessfulPayment = () => {
  const router = useRouter();
  useEffect(() => {
    const redirect = setTimeout(() => {
      router.push('/orders');
    }, 5000);
    return () => {
      clearTimeout(redirect);
    };
  }, []);

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3'>
      <h2 className='block text-4xl text-green-600'>
        Transaction Completed Successfully
      </h2>
      <p className='text-2xl'>Thank you for your billing</p>
    </div>
  );
};
export default SuccessfulPayment;
