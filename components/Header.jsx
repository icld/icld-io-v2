import { useState, useEffect } from 'react';
// import Link from 'next/link';
import { Link } from '../components/Link';
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
      <nav className='flex items-center justify-between mt-4 mb-2 '>
        <Link href='/' className='px-1 text-xl border-2 rounded-md'>
          ICLD
        </Link>
        {/* upper Nav */}

        <div className='px-2 border-2 rounded-md text-md md:text-xl'>
          {navItems.map((item, i) =>
            item.name === 'lx' ? (
              <a
                className='mx-2 md:mx-6'
                target='_blank'
                rel='noreferrer'
                href={item.href}
              >
                {item.name}
              </a>
            ) : (
              <Link href={item.href}>
                <a className='mx-2 md:mx-6'>{item.name}</a>
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
