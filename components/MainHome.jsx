import { CameraIcon } from '@heroicons/react/solid';
import Image from 'next/image';

import icldImg from '../public/icld.jpeg';
export default function Example() {
  return (
    <div className='overflow-hidden bg-white'>
      <div className='relative px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='absolute top-0 bottom-0 hidden w-screen lg:block bg-gray-50 left-3/4' />
        <div className='mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none'>
          <div>
            <h3 className='mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl'>
              Meet Ian
            </h3>
          </div>
        </div>
        <div className='mt-8 lg:grid lg:grid-cols-2 lg:gap-8'>
          <div className='relative lg:row-start-1 lg:col-start-2'>
            <div className='relative mx-auto text-base max-w-prose lg:max-w-none'>
              <figure>
                <div className='aspect-w-12 aspect-h-7 lg:aspect-none'>
                  <Image
                    className='object-cover object-center rounded-lg shadow-lg'
                    src={icldImg}
                    alt='Whitney leaning against a railing on a downtown street'
                    width={1184}
                    height={1376}
                  />
                </div>
                <figcaption className='flex mt-3 text-sm text-gray-500'>
                  <CameraIcon
                    className='flex-none w-5 h-5 text-gray-400'
                    aria-hidden='true'
                  />
                  <span className='ml-2'>
                    Photograph of a man staring off into nothing
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
          <div className='mt-8 lg:mt-0'>
            <div className='mx-auto text-base max-w-prose lg:max-w-none '>
              <p className='mb-6 text-lg text-gray-500 md:text-2xl'>
                Hello! I am a freelance developer living in Portland, Oregon. I
                have a background in concert lighting design and production
                management.
              </p>
              <p className='mb-6 text-lg text-gray-500 md:text-2xl'>
                I have a young daughter and an old dog. We love to go mountain
                biking and run around in the woods.
              </p>
              <p className='text-lg text-gray-500 md:text-2xl'>
                Coding programs and websites is fun for me. I love building
                something out of nothing, and I enjoy the creative relationship
                with clients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
