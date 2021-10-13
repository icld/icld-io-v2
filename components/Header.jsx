import { Fragment, useState, useEffect, useRef } from 'react';
// import { Link } from '../components/Link';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { ImMinus, ImPlus } from 'react-icons/im';
import { ImArrowRight2 } from 'react-icons/im';
import { GiDuration, GiForearm } from 'react-icons/gi';
import { motion } from 'framer-motion';
import router, { useRouter } from 'next/router';
import Title from './Title';

const Header = (props) => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState(false);
  const [chngCol, setChngCol] = useState(false);

  //remove dropdown menu when window is larger size
  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        setActiveMenu(false);
      }
    });
  });

  return (
    <section className='relative z-50 flex items-center justify-center w-full '>
      <nav className='absolute top-0 z-20 flex items-center justify-between w-11/12 h-20 m-auto '>
        {/* upper Nav */}

        <Title />
        {/* Nav Drop Down Menu */}
        <div className=''>
          <Menu
            as='div'
            className='relative z-10 block mr-2 text-left md:mr-1 md:hidden'
          >
            {({ open }) => (
              <>
                <Menu.Button className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
                  {open ? <ImMinus className='' /> : <ImPlus />}
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
                  <Menu.Items className='absolute right-0 justify-end w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    {({ active }) =>
                      navItems.map((navI, i) => (
                        <Menu.Item key={i}>
                          <>
                            <Link href={navI.href}>
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

        {/* Standard Nav */}
        <div className='hidden w-2/5 text-lg text-yellow-100 md:flex-row md:justify-evenly md:flex md:text-3xl font-another'>
          {navItems.map((item, i) =>
            item.name === 'lx' ? (
              <motion.a
                initial={{ y: '-50%' }}
                animate={{ y: '0%' }}
                transition={{
                  delay: 3,
                  duration: 4,
                }}
                className={` text-center rounded-xl p-1   ${
                  router.pathname == item.href ? 'bg-red-300 text-white' : null
                }`}
                target='_blank'
                rel='noreferrer'
                href={item.href}
              >
                {item.name}
              </motion.a>
            ) : (
              <Link href={item.href} passHref>
                <motion.a
                  initial={{ y: '-150%' }}
                  animate={{
                    y: '0%',
                    transition: {
                      type: 'bounce',
                      delay: i,
                      duration: 1,
                    },
                  }}
                  whileTap={{
                    scale: 0.9,
                    transition: { y: { stiffness: 1000, velocity: -100 } },
                  }}
                  whileHover={{
                    scale: 1.1,
                    transition: { y: { stiffness: 1000, velocity: -100 } },
                  }}
                >
                  <div
                    className={` text-center rounded-xl p-1   ${
                      router.pathname == item.href ? 'text-gray-50' : null
                    }`}
                  >
                    {item.name}
                  </div>
                </motion.a>
              </Link>
            )
          )}
        </div>
      </nav>
    </section>
  );
};
export default Header;

const navItems = [
  { name: 'portfolio', href: '/portfolio' },
  { name: 'about', href: '/about' },
  // { name: 'lx', href: 'https://www.icldesign.com' },
  { name: 'contact', href: '/contact' },
  { name: 'blog', href: '/blog' },
];
