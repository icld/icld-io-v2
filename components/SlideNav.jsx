import { Fragment, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import router, { useRouter } from 'next/router';

import { Dialog, Menu, Transition } from '@headlessui/react';
import { ImMinus, ImPlus } from 'react-icons/im';
import { ImArrowRight2 } from 'react-icons/im';
import { GiDuration, GiForearm } from 'react-icons/gi';
import { motion, useCycle, useMotionValue, useTransform } from 'framer-motion';
import { navItems } from './Header';

function SlideNav() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const threshold = 0.2;
  const [current, pos] = useCycle('before', 'after');
  const x = useMotionValue(0);

  const handleOpen = () => {
    if (isOpen) {
      setIsOpen(false);
      pos(0);
    } else {
      setIsOpen(true);
      pos(1);
    }
  };

  const variants = {
    before: {
      x: '-150%',
      opacity: 0,
      visibility: 'hidden',

      transition: { ease: 'easeOut', duration: 0.5, delay: 0.5 },
    },

    after: {
      opacity: 1,
      visibility: 'visible',

      x: '0%',
      transition: { ease: 'easeOut', delay: 0.1, duration: 0.5 },
    },
  };

  const transition = {
    min: 0,
    max: 120,
    type: '',

    bounceStiffness: 200,
    damping: 1000,
  };

  return (
    <div className='z-10'>
      <button
        className={` flex  justify-center  items-center w-8 h-8 px-4 py-1 text-sm font-medium bg-yellow-300 rounded-md hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75  md:hidden  ${
          isOpen && 'hidden'
        }`}
        onClick={() => {
          handleOpen();
        }}
      >
        <ImPlus className='absolute text-black' />
      </button>
      <div>
        {/* Close button */}
        <motion.button
          whileHover={{ scale: 3 }}
          whileTap={{ scale: [5, 1] }}
          transition={{ duration: 0.5 }}
          onClick={() => handleOpen()}
          className={`fixed z-50 top-8 right-10  ${!isOpen && 'hidden'}`}
        >
          X{' '}
        </motion.button>
        <motion.div
          // initial={{ transform: 'none' }}
          animate={current}
          // variants={variants}
          drag='x'
          style={isOpen && { left: 6 }}
          dragTransition={transition}
          dragConstraints={{ left: 0, right: 50 }}
          dragElastic={1}
          onDragEnd={(event, info) => {
            console.log(info.delta.x);
            if (info.delta.x > threshold || info.point.x > 200) {
              handleOpen();
            }
          }}
          className={`fixed top-0 left-0 z-40 w-full h-screen pr-8 bg-yellow-200 pt-44 duration-300  transform  ${
            isOpen ? '' : 'left-full'
          }`}
        >
          <div className='absolute flex flex-col text-6xl text-yellow-300 transition-colors ease-linear sm:flex-row hover:text-yellow-100 md:text-7xl font-another top-2 left-6'>
            <div>IAN</div>
            <div>CAMERON</div>
            <div>LYLES</div>
          </div>
          <div className='relative flex flex-col items-end h-3/4 justify-evenly'>
            {navItems.map((item, i) => (
              <Link href={item.href} key={i} passHref>
                <motion.a
                  initial={false}
                  animate={current}
                  variants={variants}
                  style={{ x: 0 }}
                  className='text-5xl font-another'
                  onClick={() => {
                    handleOpen();
                  }}
                >
                  {' '}
                  {item.name}
                </motion.a>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default SlideNav;
//
