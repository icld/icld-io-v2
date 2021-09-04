import { CameraIcon } from '@heroicons/react/solid';
import Image from 'next/image';

import icldImg from '../public/icld.jpeg';
import { Link } from './Link';
import { FiArrowLeft, FiArrowRight, FiArrowUpLeft } from 'react-icons/fi';
export default function Example() {
  return (
    <div className='overflow-hidden bg-white'>
      <div className='relative px-4 py-8 mx-auto lg:py-16 max-w-7xl sm:px-6 lg:px-8 '>
        {/* <div className='absolute top-0 bottom-0 hidden w-screen lg:block bg-gray-50 left-3/4' /> */}
        <div className='mx-auto text-base max-w-prose md:grid md:grid-cols-2 md:gap-8 md:max-w-none'></div>
        <div className='grid font-dingo md:grid-cols-2 md:gap-8'>
          <div className='relative row-start-2 md:row-start-1 md:col-start-2'>
            <div className='relative h-full lg:aspect-none'>
              <Image
                className='object-cover rounded-lg shadow-lg '
                src={icldImg}
                alt='Ian staring off into nothing'
                layout='responsive'
                width={1184}
                height={1376}
              />
            </div>
          </div>
          <div className='font-normal tracking-wide max-w-prose lg:max-w-none'>
            <h1 className='mb-2 text-3xl tracking-tight text-gray-800 font-another md:text-4xl lg:text-6xl '>
              Ian Cameron Lyles
            </h1>
            <h3 className='mb-5 text-xl text-yellow-500 font-another'>
              developer
            </h3>
            <p className='mb-3 text-sm text-gray-800 md:text-lg'>
              Hello! I am a freelance developer living in Portland, Oregon. I
              have a background in concert lighting design and production
              management.
            </p>
            <p className='mb-3 text-sm text-gray-800 md:text-lg'>
              I have a young daughter and an old dog. We love to go mountain
              biking and run around in the woods.
            </p>
            <p className='mb-6 text-sm text-gray-800 md:text-lg '>
              Coding and designing web applications is fun for me. I love
              building something out of nothing. I enjoy the creative
              relationships I get to develop with my clients, exploring dynamic
              solutions to everyday problem solving, and discovering efficiences
              that make their lives and businesses run smoothly.
            </p>

            {/* responsive link to contact */}
            {/* <Link href='/contact' className=''>
              {' '}
              <div className='flex flex-col py-1 text-5xl text-center text-white transition-all delay-100 transform bg-gray-900 border-4 rounded-md shadow-sm font-normaltracking-widest group hover:font-extralight hover:border-transparent md:text-7xl hover:uppercase'>
                <div className='group-hover:text-blue-400 '>What Would</div>
                <div className='flex flex-row items-center justify-center'>
                  {' '}
                  <FiArrowRight className='hidden font-light group-hover:block group-hover:text-yellow-600 ' />
                  <div>{`${' You'}`} </div>{' '}
                  <FiArrowLeft className='hidden font-light group-hover:block group-hover:text-yellow-600' />
                  <div className='group-hover:hidden'>Like To</div>
                </div>
                <div className='group-hover:tracking-widest group-hover:font-medium group-hover:text-blue-500 '>
                  Build?
                </div>
              </div>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
