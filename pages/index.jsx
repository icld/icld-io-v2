import { useRef, useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Image from 'next/image';
import Footer from '../components/Footer';
import About from '../components/About';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import VisibilitySensor from 'react-visibility-sensor';

import { BsChevronDoubleDown } from 'react-icons/bs';
import hero from '../public/hero_home.jpg';

export default function Home() {
  const router = useRouter();
  const aboutRef = useRef(null);
  const heroRef = useRef(null);
  const [aboutIsVisible, setAboutIsVisible] = useState(false);

  // useEffect(() => {
  //   // setAboutIsVisible(false);
  //   return () => {
  //     aboutIsVisible;
  //   };
  // }, []);

  const scrollToRef = (ref) => {
    window.scrollTo({
      top: (0, ref.current.offsetTop),
      behavior: 'smooth',
    });
  };

  return (
    <div className='flex flex-col' ref={heroRef}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className='relative w-screen h-screen '
      >
        <div className='top-0 left-0 w-full mx-auto '>
          <Image
            src={hero}
            alt='Street scenes'
            layout='fill'
            objectFit='cover'
          />
        </div>

        {/* Bouncing Down Arrow */}
        <motion.div
          variants={chevronVariants}
          whileHover='hover'
          whileTap='click'
          initial={{ scale: 1 }}
          animate={aboutIsVisible ? 'pointingUp' : 'bounce'}
          className={`fixed z-50 flex text-5xl text-white left-1/2 bottom-14  `}
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

      {/* About Section */}
      <VisibilitySensor
        partialVisibility={true}
        minTopValue={250}
        onChange={(isVisible) =>
          isVisible ? setAboutIsVisible(true) : setAboutIsVisible(false)
        }
      >
        <div className='relative' ref={aboutRef}>
          <About />
        </div>
      </VisibilitySensor>
    </div>
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
