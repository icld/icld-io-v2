import Layout from '../components/Layout';
import Header from '../components/Header';
import Image from 'next/image';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

import { BsCaretDown } from 'react-icons/bs';
import hero from '../public/hero_home.jpg';

export default function Home() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='relative w-screen h-screen '
    >
      <div className='top-0 left-0 w-full mx-auto '>
        <Image src={hero} alt='Street scenes' layout='fill' objectFit='cover' />
      </div>

      {/* Bouncing Down Arrow */}
      <motion.div
        variants={chevronVariants}
        whileHover='hover'
        whileTap='click'
        initial={{ scale: 1 }}
        animate='bounce'
        className='absolute z-50 flex text-5xl text-white left-1/2 bottom-14'
      >
        <BsCaretDown className='text-yellow-300' />
      </motion.div>
    </motion.section>
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout title='icld.io' description='icld.io'>
      <Header />
      {page}
      <Footer />
    </Layout>
  );
};

const chevronVariants = {
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
    y: ['10%', '-10%'],
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
};
