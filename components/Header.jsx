import { Fragment, useState, useEffect, useRef } from 'react';
// import { Link } from '../components/Link';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { ImMinus, ImPlus } from 'react-icons/im';
import { ImArrowRight2 } from 'react-icons/im';
import { GiDuration, GiForearm } from 'react-icons/gi';
import { motion } from 'framer-motion';
import { useStore } from '../lib/zustand/store';

import router, { useRouter } from 'next/router';
import Title from './Title';
import DropDownNav from './DropDownNav';
import SlideNav from './SlideNav';

const Header = (props) => {
  const { aboutRefStore } = useStore();

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

  const navItems = [
    { name: 'portfolio', href: '/portfolio' },
    { name: 'about', href: '/#about' },
    { name: 'contact', href: '/contact' },
    // { name: 'blog', href: '/blog' },
  ];

  return (
    <section className='relative flex items-center justify-center w-full '>
      <nav
        className={` 
        ${
          router.pathname == '/' && 'absolute'
        } top-0  flex items-center justify-between w-11/12 h-20 m-auto `}
      >
        <Title />

        {/* Nav Drop Down Menu */}
        {/* <DropDownNav /> */}
        <SlideNav navItems={navItems} />
        {/* Standard Nav */}
        <div
          className={`items-center hidden w-2/5 text-lg z-50 ${
            router.pathname == '/' && 'text-yellow-300 text-shadow-xl '
          } md:flex-row md:justify-evenly md:flex md:text-3xl font-another `}
        >
          {navItems.map((item, i) =>
            item.name === 'lx' ? (
              <motion.a
                key={i}
                initial={{ y: '-50%' }}
                animate={{ y: '0%' }}
                transition={{
                  delay: 3,
                  duration: 4,
                }}
                className={` text-center rounded-xl p-1  hover:text-yellow-100 ${
                  router.pathname == item.href ? 'bg-red-300 text-white' : null
                }`}
                target='_blank'
                rel='noreferrer'
                href={item.href}
              >
                {item.name}
              </motion.a>
            ) : (
              <Link key={i} href={item.href} passHref>
                <motion.a
                  initial={{ y: '-150%' }}
                  animate={{
                    y: '0%',
                    transition: {
                      type: 'bounce',
                      delay: +i / 2,
                      duration: 0.5,
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
                    className={` text-center rounded-xl p-1    ${
                      router.pathname == item.href && 'text-yellow-300'
                    } ${router.pathname == '/' && 'hover:text-yellow-100'}`}
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
