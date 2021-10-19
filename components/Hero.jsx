import { motion } from 'framer-motion';
import Image from 'next/image';
import hero from '../public/hero_home.jpg';

function Hero({ aboutRef, heroRef }) {
  return (
    <div className='flex flex-col items-center w-full m-auto '>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className='relative flex flex-col items-center w-full h-screen'
      >
        <div className='top-0 left-0 w-full mx-auto '>
          <Image
            src={hero}
            alt='Street scenes'
            layout='fill'
            objectFit='cover'
            className='bg-black '
            priority={true}
            quality={60}
          />
        </div>

        {/* <BouncingDownArrow /> */}
      </motion.section>
    </div>
  );
}

export default Hero;
