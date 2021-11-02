import { Link } from './Link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import urlFor from '../lib/sanity/urlFor';
import { motion } from 'framer-motion';

export default function ({ slug, title, description, image }) {
  const router = useRouter();
  console.log(description);
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col items-center justify-center w-full overflow-hidden shadow-sm font-another group '
    >
      <Link
        href={`/portfolio/${slug}`}
        className='flex flex-col w-full h-full overflow-hidden transition-all duration-500 transform bg-transparent rounded-sm cursor-pointer group lg:max-w-3xl'
      >
        {' '}
        <div className='flex flex-col items-start text-3xl group '>
          <h1 className='z-0 p-1 px-4 ml-2 text-lg text-left text-white translate-y-2 bg-blue-500 rounded-md shadow-md md:text-xl lg:text-2xl'>
            {title}
          </h1>
          <div className='z-50 flex justify-center m-auto text-white '>
            <div className='fixed px-8 text-xl sm:text-3xl text-center align-middle transition-all duration-500 delay-100 transform opacity-50 top-1/2 md:text-3xl group-hover:opacity-100 group-hover:text-white text-shadow-lg group-hover:scale-105'>
              {description}
            </div>
          </div>
          <Image
            className='object-cover transition-all duration-500 rounded-sm shadow-md '
            src={`${urlFor(image).url()}`}
            alt={title}
            width={700}
            height={350}
          />
        </div>
      </Link>
    </motion.div>
  );
}
