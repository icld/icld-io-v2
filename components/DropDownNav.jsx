import { Fragment, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import router, { useRouter } from 'next/router';

import { Menu, Transition } from '@headlessui/react';
import { ImMinus, ImPlus } from 'react-icons/im';
import { ImArrowRight2 } from 'react-icons/im';
import { GiDuration, GiForearm } from 'react-icons/gi';
import { motion } from 'framer-motion';
import { navItems } from '../components/Header';

function DropDownNav() {
  const router = useRouter();

  return (
    <div className=''>
      <Menu
        as='div'
        className='relative top-0 z-10 block mr-2 text-left md:mr-1 md:hidden'
      >
        {({ open }) => (
          <>
            <Menu.Button className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium bg-yellow-400 rounded-md hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
              {open ? <ImMinus /> : <ImPlus className=' mix-blend-lighten' />}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 justify-end w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none '>
                {({ active }) =>
                  navItems.map((navI, i) => (
                    <Menu.Item key={i}>
                      <>
                        <Link href={navI.href} passHref>
                          <a
                            className={` w-full  ${
                              router.pathname === navI.href
                                ? ' text-white bg-yellow-500'
                                : 'hover:text-white hover:bg-red-500'
                            } group flex rounded-md items-center justify-end w-full px-2 py-2 text-sm   `}
                          >
                            <div className='z-50 flex flex-row items-center justify-center w-full'>
                              <motion.div
                                // initial={}
                                animate={{ x: ['25%', '25%'] }}
                                className='flex items-center justify-center w-1/2 '
                              >
                                <ImArrowRight2 className='text-center ' />
                              </motion.div>
                              <div className='w-1/2 text-center'>
                                {navI.name}
                              </div>
                            </div>
                          </a>
                        </Link>
                      </>
                    </Menu.Item>
                  ))
                }
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
}

export default DropDownNav;
