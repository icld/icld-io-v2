import { Fragment, useState, useEffect, useRef } from 'react';
import { Link } from '../components/Link';
import { Menu, Transition } from '@headlessui/react';
import { ImMinus, ImPlus } from 'react-icons/im';
import { ImArrowRight2 } from 'react-icons/im';
import { GiForearm } from 'react-icons/gi';
import router, { useRouter } from 'next/router';

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
    <section>
      <nav className='flex items-center justify-between mt-4 mb-2 border-l-2 border-r-2 w-7/8 '>
        <Link
          href='/'
          className='flex flex-row items-center justify-center ml-1 text-xl '
        >
          <GiForearm className='text-3xl' />
          <div className='ml-3'>ICLD</div>
        </Link>
        {/* upper Nav */}

        {/* Nav Drop Down Menu */}
        <div className=''>
          <Menu
            as='div'
            className='relative z-10 block inline-block mr-2 text-left md:mr-1 md:hidden'
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
                  <Menu.Items className='absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    {({ active }) =>
                      navItems.map((navI, i) => (
                        <Menu.Item key={i}>
                          <>
                            <button
                              onClick={() => router.push(`${navI.href}`)}
                              className={`${
                                active
                                  ? 'hover:bg-violet-500 text-white'
                                  : 'hover:text-white hover:bg-red-500'
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              <ImArrowRight2 className='mr-4 group-hover:text-pink-200 group-hover:text-xl' />
                              <div className='text-center'>{navI.name}</div>
                            </button>
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
        <div className='hidden w-1/2 mr-2 text-lg md:flex-row md:justify-between md:flex md:text-xl'>
          {navItems.map((item, i) =>
            item.name === 'lx' ? (
              <a
                className={`w-28 text-center rounded-xl p-1   ${
                  router.pathname == item.href ? 'bg-red-300 text-white' : null
                }`}
                target='_blank'
                rel='noreferrer'
                href={item.href}
              >
                {item.name}
              </a>
            ) : (
              <Link href={item.href}>
                <div
                  className={`w-28 text-center rounded-xl p-1   ${
                    router.pathname == item.href
                      ? 'bg-red-300 text-white'
                      : null
                  }`}
                >
                  {item.name}
                </div>
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
  { name: 'lx', href: 'https://www.icldesign.com' },
  { name: 'contact', href: '/contact' },
  { name: 'blog', href: '/blog' },
];
