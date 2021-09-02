import Link from 'next/link';
import router, { useRouter } from 'next/router';

export default function () {
  const router = useRouter();
  return (
    <>
      <div className='w-full bg'>
        <a href='/public/14.pdf' download rel='noreferrer' target='_blank'>
          {' '}
          a Download Link?
        </a>
      </div>
      <div className='w-1/2 bg-gray-500 h-1/2'>
        <button
          className='bg-red-400 border-2'
          onClick={() => router.push('/public/14.pdf')}
        >
          {' '}
          A button maybe?
        </button>
      </div>
    </>
  );
}
