import { motion } from 'framer-motion';
import Image from 'next/image';
import { BsChevronDoubleDown } from 'react-icons/bs';
import Avatar from '../components/Auth/Avatar';
import hero from '../public/hero_home.jpg';
import { useStore } from '../lib/zustand/store';

function Hero() {
  const { aboutIsVisible, setAboutIsVisible } = useStore();

  return (
    <div className='flex flex-col'>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className='relative w-full h-screen '
      >
        <div className='top-0 left-0 w-full mx-auto '>
          <Image
            src={hero}
            alt='Street scenes'
            layout='fill'
            objectFit='cover'
            className='bg-black '
          />
        </div>
        <Avatar />
        {/* Bouncing Down Arrow */}
        <motion.div
          variants={chevronVariants}
          whileHover='hover'
          whileTap='click'
          initial={{ scale: 1 }}
          animate={aboutIsVisible ? 'pointingUp' : 'bounce'}
          className={`fixed z-50 flex flex-col text-5xl    bottom-14 w-full  ${
            aboutIsVisible ? 'items-end -left-4' : 'items-center'
          } `}
        >
          <BsChevronDoubleDown
            className={`text-yellow-300 ${aboutIsVisible && 'rotate-180'} `}
            onClick={
              aboutIsVisible
                ? () => scrollToRef(heroRef)
                : () => scrollToRef(aboutRef)
            }
          />
        </motion.div>
      </motion.section>
    </div>
  );
}

export default Hero;

const chevronVariants = {
  pointingUp: {
    x: '800%',
    transition: { x: { duration: 0.5 } },
  },
  hover: {
    scale: 1.1,
    transition: { y: { stiffness: 1000, velocity: -100, duration: 0.5 } },
    y: 0,
  },

  click: {
    scale: 0.9,
    transition: { y: { stiffness: 1000, velocity: -100 } },
  },

  bounce: {
    y: {
      value: ['10%', '-10%'],
      transition: {
        type: 'spring',
        stiffness: 50,
        yoyo: Infinity,
        duration: 1,
        damping: 10,
        repeatDelay: 0,
        ease: 'easeOut',
      },
    },
    x: {
      value: '0',
      transition: {
        duration: 0.5,
      },
    },
  },
};
