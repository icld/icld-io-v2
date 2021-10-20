import { Fragment, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import router, { useRouter } from 'next/router';

import { Dialog, Menu, Transition } from '@headlessui/react';
import { ImMinus, ImPlus } from 'react-icons/im';
import { ImArrowRight2 } from 'react-icons/im';
import { GiDuration, GiForearm } from 'react-icons/gi';
import { motion } from 'framer-motion';
import { navItems } from './Header';

function DropDownNav() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const threshold = 6;

  const transition = {
    min: 0,
    max: 120,
    bounceDamping: 500,
    bounceStiffness: 1000,
    damping: 1000,
  };

  return (
    <div className=''>
      <button
        className={` flex  justify-center  items-center w-12 h-12 px-4 py-2 text-sm font-medium bg-yellow-300 rounded-md hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${
          isOpen && 'hidden'
        }`}
        onClick={() => setIsOpen(true)}
      >
        <ImPlus />
      </button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} as='div'>
        <Dialog.Overlay />
        <button
          onClick={() => setIsOpen(false)}
          className='fixed z-50 top-8 right-10 '
        >
          X{' '}
        </button>
        <motion.div
          drag='x'
          dragTransition={transition}
          dragConstraints={{ left: 0, right: 300 }}
          dragElastic={{ left: 0, right: 1 }}
          dragDirectionLock
          // onDrag={(event, info) => console.log(info.delta.x)}
          onDragEnd={(event, info) => {
            console.log(info.delta.x);
            if (info.delta.x > threshold) {
              setIsOpen(false);
            }
          }}
          // onDirectionLock={(x) => console.log(info.x)}
          layout
          className='fixed top-0 z-40 w-full h-screen pr-8 bg-yellow-200 pt-44 -right-2'
        >
          <div className='flex flex-col items-end h-3/4 justify-evenly'>
            {navItems.map((item, i) => (
              <Link href={item.href} key={i}>
                <a className='text-5xl font-another '> {item.name}</a>
              </Link>
            ))}
          </div>
        </motion.div>
      </Dialog>
    </div>
  );
}

export default DropDownNav;
