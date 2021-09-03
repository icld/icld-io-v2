import { CameraIcon } from '@heroicons/react/solid';
import Image from 'next/image';

import icldImg from '../public/icld.jpeg';
import { Link } from './Link';
import { FiArrowLeft, FiArrowRight, FiArrowUpLeft } from 'react-icons/fi';
export default function Example() {
  return (
    <div className='overflow-hidden bg-white'>
      <div className='relative px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8 '>
        {/* <div className='absolute top-0 bottom-0 hidden w-screen lg:block bg-gray-50 left-3/4' /> */}
        <div className='mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none'>
          <div>
            <span className='mt-2 leading-8 tracking-tight text-gray-800 font-another line md:text-6xl sm:text-2xl'>
              Ian Cameron Lyles
            </span>
          </div>
        </div>
        <div className='mt-8 font-dingo lg:grid lg:grid-cols-2 lg:gap-8'>
          <div className='relative lg:row-start-1 lg:col-start-2'>
            <div className='relative mx-auto text-base max-w-prose lg:max-w-none'>
              <figure>
                <div className='relative aspect-w-12 aspect-h-7 lg:aspect-none'>
                  <Image
                    className='object-cover object-center rounded-lg shadow-lg'
                    src={icldImg}
                    alt='Ian staring off into nothing'
                    width={1184}
                    height={1376}
                  />
                </div>
              </figure>
            </div>
          </div>
          <div className='flex flex-col m-auto mt-8 font-normal tracking-wide lg:mt-0 max-w-prose lg:max-w-none'>
            <p className='mb-6 text-lg text-gray-800 md:text-lg'>
              Hello! I am a freelance developer living in Portland, Oregon. I
              have a background in concert lighting design and production
              management.
            </p>
            <p className='mb-6 text-lg text-gray-800 md:text-lg'>
              I have a young daughter and an old dog. We love to go mountain
              biking and run around in the woods.
            </p>
            <p className='mb-6 text-lg text-gray-800 md:text-lg '>
              Coding and designing web applications is fun for me. I love
              building something out of nothing. I enjoy the creative
              relationships I get to develop with my clients, exploring dynamic
              solutions to everyday problem solving, and discovering efficiences
              that make their lives and businesses run smoothly.
            </p>

            <Link href='/contact' className=''>
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
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
